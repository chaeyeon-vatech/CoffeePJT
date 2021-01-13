import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import First from "./First";
import Second from "./Second";

const QontoConnector = withStyles({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)'
    },
    active: {
        '& $line': {
            borderColor: '#352626',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#784af4',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

//icon 디자인

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        background: "transparent"
    },
    active: {
        color: '#0e0e0d',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#0a0a0a',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const {active, completed} = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed}/> : <div className={classes.circle}/>}
        </div>
    );
}

QontoStepIcon.propTypes = {

    active: PropTypes.bool,
    completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
        body: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            boxShadow: 'none',
            color: "white"
        },
        root: {
            width: '100%',

        },
        wrapper: {
            textAlign: "center",
        },

        button1: {
            width: "200px",
            height: "40px",
            marginRight: "20px"
        },
        button2: {
            width: "100px",
            height: "40px"
        },
        container: {
            textAlign: "center"
        },

        button: {
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(103,69,69,0.5)",
            display: "inline"
        },
        margin: {
            marginRight: "40px"
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),

        }
        ,

    }))
;

function getSteps() {
    return ['이름으로 결제자 로그인', '주문 생성', '완료!'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <First/>;
        case 1:
            return <Second/>;
        case 2:
            return '주문 생성 완료';
        default:
            return 'Unknown step';
    }
}


export default function CustomizedSteppers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleClick = () => {

        localStorage.clear()
        window.location.href = '/'

    }


    return (

        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>} className={classes.body}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div>
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    {localStorage.getItem('name') && activeStep === 0 && (
                        <div className={classes.container}>

                            <Button variant="contained"
                                    onClick={handleClick}
                                    className={classes.button1}>{localStorage.getItem('name')}님이 아닙니다.</Button>
                            <Button
                                variant="contained"

                                onClick={handleNext}
                                className={classes.button2}
                            >
                                맞습니다.
                            </Button>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
