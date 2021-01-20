import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Second from "./SecondStep";
import Third from "./FirstStep";
import {useMutation} from "@apollo/react-hooks";
import {TaskCreateMutation} from "../../graphql/mutation";
import {TaskQuery} from "../../graphql/query";


const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        backgroundColor: "black",

    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
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
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 20,
        backgroundColor: "black"
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "black",
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 25%, rgb(138,35,135) 50%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const {active, completed} = props;

    const icons = {
        1: <GroupAddIcon/>,
        2: <SettingsIcon/>
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {

    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "70%",


    },
    button: {
        marginLeft: "70px",
        marginTop: "-400px",
        margin: "none",
        cursor: "pointer",
        position: "relative",
        display: "block",
        width: "100px",
        height: "100px",
        border: "solid 6px #9e344d",
        borderRadius: "100%",
        transition: "all .2s linear",
        "&:hover": {
            backgroundColor: 'rgb(12,12,12,0.8)'
        }

    },
    nbutton: {
        marginLeft: "1300px",
        marginTop: "-100px",
        margin: "none",
        cursor: "pointer",
        position: "relative",
        display: "block",
        width: "100px",
        height: "100px",
        backgroundColor: "#9e344d",
        border: "solid 6px #9e344d",
        borderRadius: "100%",
        transition: "all .2s linear",
        "&:hover": {
            backgroundColor: 'rgb(12,12,12,0.8)'
        }


    },

    background: {
        backgroundColor: "rgba(169,162,162,0.9)",

    }

}));

function getSteps() {
    return ['주문자/미주문자 관리', '주문 생성'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Third/>;
        case 1:
            return <Second/>;

    }
}

export default function CustomizedSteppers() {
    const classes = useStyles();
    const [step, setStep] = useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const handleBack = () => {
        if (window.confirm('결제자를 변경하시겠습니까?')) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            localStorage.clear();
            window.location.href = '/login'
        }
    };


    const [create] = useMutation(TaskCreateMutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {
                title: localStorage.getItem('task'),
                userid: localStorage.getItem('myData')
            },
            onCompleted: () => {
                alert("주문이 생성되었습니다!");
                localStorage.setItem('num', 0);
            },

            onError: () => {
                alert("주문 내용을 정확히 작성해주세요.")
            },
        }
    )

    return localStorage.getItem('task') ? (

        <div className={classes.root}>


            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}
                     className={classes.background}>

                <Step>

                    <StepLabel StepIconComponent={AssignmentTurnedInTwoToneIcon}>Completed</StepLabel>

                </Step>


            </Stepper>
            <div>
                <div>

                    <div>

                        <Typography><Second/></Typography>

                    </div>
                </div>
                )}
            </div>
        </div>
    ) : (
        <div className={classes.root}>


            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}
                     className={classes.background}>

                {steps.map((label) => (
                    <Step key={label}>

                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>

                    </Step>
                ))}


            </Stepper>
            <div>
                {activeStep === 0 ? (
                    <div>

                        <div>

                            <Typography className={classes.instructions}>

                                {getStepContent(activeStep)}</Typography>

                            <Button onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                className={classes.nbutton}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>

                        <div>

                            <Typography className={classes.instructions}>

                                {getStepContent(activeStep)}</Typography>

                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={create}
                                className={classes.nbutton}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
