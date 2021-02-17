import React, {useContext, useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {SEARCH_QUERY, TASK_QUERY} from "../../graphql/query";
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {UserContext} from "../../context";
import moment from 'moment';

const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            paddingTop: "10px",
            position: 'absolute',
            left: '50%',
            top: '45%',
            transform: 'translate(-50%, -50%)',
            width: "100%",
            margin: "auto",
            maxWidth: "525px",
            minHeight: "300px",
            boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.24),0 17px 50px 0 rgba(0,0,0,.19)",
        },

        confirmwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            paddingTop: "10px",
            width: "100%",
            margin: "auto",
            maxWidth: "525px",
            minHeight: "300px",
            position: "relative",
        },
        loginhtml: {
            width: "100%",
            height: "100%",
            position: "center",
            padding: "100px 70px 50px 70px",
            backgroundColor: theme.color.red,
            marginTop: "70px"

        },

        h3: {
            color: "white",
            marginBottom: "30px",
            textAlign: "center",
            marginTop: "40px"
        },
        h5: {
            color: "white",
            padding: "30px 30px 30px 30px",
            marginBottom: "30px",
            fontWeight: "bolder",
            textAlign: "center"
        },
        loginform: {
            minHeight: "345px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d"

        },

        loginafter: {
            marginTop: "200px",
            minHeight: "200px",
            position: "relative",
            transformStyle: "preserve-3d",
            backgroundColor: theme.color.red,
            marginBottom: "20px",
            padding: "20 20 20 20",
            '&:nth-child(n) > button': {
                width: "100%",
                margin: "none",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)",
                textAlign: "center",
                alignContent: "center",
                marginTop: "30px",
                display: "block",
                marginBottom: "30px"
            }

        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > TextField,label,input,button,a,table': {
                width: "100%",
                color: "#fff",
                textAlign: "center"
            },
            '&:nth-child(n) > TextField,input,button,table,tr': {
                border: "none",
                padding: "15px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)",
                textAlign: "center",
                alignContent: "center"
            },
            '&:nth-child(n) > TextField': {
                outline: "none",
            },

            '&:nth-child(n) > tr,td, TextField': {
                width: "50%",
                padding: "15px 60px",
                alignContent: "center",
                marginTop: 10,
                border: "none",
                margin: "20px",
            },

            '&:nth-child(n) > button': {
                marginTop: "50px",
                border: "none",
                padding: "50px 50px",
                borderRadius: "25px",
                backgroundColor: "rgba(212,184,184,0.9)",
                width: "100%",
                color: "black",
                display: "block",
                fontSize: "15px"
            },
            '&:nth-child(n) > label ': {
                color: "#aaa",
                fontSize: "12px"
            },
            palette: {
                primary: {
                    main: 'rgba(255,255,255,.1)',
                },
                secondary: {
                    main: '#030303',
                },
            },

        },
        button: {
            display: "inline-block",
            marginRight: "5px",
            padding: 20
        }
    }))
;

const handleClick = (name, id) => {
    if (id) {

        localStorage.setItem('myData', id.toString())
        localStorage.setItem('name', name)
        window.location.href = '/order'
    }
}

const nowTime = moment().format('YYYY년 MM월 DD일');


const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});
    const [result, setResult] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState("");
    const [o, setO] = useState([]);

    const {userContext, dispatchUser} = useContext(UserContext);

    const {data: task} = useQuery(TASK_QUERY);

    const {data} = useQuery(SEARCH_QUERY, {
        variables: {
            word: inputValue
        },

    });

    const {data: one} = useQuery(SEARCH_QUERY, {
        variables: {
            word: value
        },
        onCompleted: (data) => {
            if (data) {
                dispatchUser({
                    type: "change",
                    target: data
                })
            }
        }
    })

    useEffect(() => {
        if (data) {
            setResult(data.user);
        }
        if (task) {
            setTasks(task.tasks);
        }
        if (one) {
            setO(one.user);
        }

    }, [data, task, one]);


    return (
        <div className={classes.root}>
            <div className={classes.loginwrap}>

                <div className={classes.loginhtml}>

                    {o.length !== 0 ? (<h3>유저가 선택되었습니다.</h3>) : (
                        tasks && tasks.map((task) => (
                            <h3 key={task}> {nowTime} <br/>{task.creater}님의 주문이 진행 중입니다.</h3>

                        ))
                    )}

                    <h5 className={classes.h5}>주문하시려면<br/>로그인해주세요!</h5>

                    <div className={classes.loginform}>

                        <div className={classes.group}>
                            <label>주문자</label>
                            <Typography component="div" variant="body1">

                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    disableClearable
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    options={result.map((content) => content.username)}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            id="standard-basic"
                                            margin="normal"
                                            color={"secondary"}
                                            placeholder={localStorage.getItem('name')}
                                            onKeyDown={({key}) => {
                                                if (key === "Enter" && value !== undefined && value !== '') {
                                                    handleClick(userContext.id.user.map((option) => option.username), userContext.id.user.map((option) => option._id))
                                                }
                                            }}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                                className: classes.focused
                                            }}
                                        />
                                    )}
                                />
                            </Typography>

                            <Button type="submit"
                                    disabled={inputValue === undefined}
                                    onClick={() => handleClick(userContext.id.user.map((option) => option.username), userContext.id.user.map((option) => option._id))}
                            >로그인</Button>

                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default AuthenticationForm;