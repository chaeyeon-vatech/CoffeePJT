import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery, VacationQuery} from "../../graphql/query";
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import Button from "@material-ui/core/Button";
import {TaskCreate} from "../../graphql/useMutation";


const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            width: "100%",
            margin: "auto",
            maxWidth: "525px",
            minHeight: "670px",
            position: "relative",
            boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.24),0 17px 50px 0 rgba(0,0,0,.19)"
        },
        loginhtml: {
            marginTop: "30px",
            width: "100%",
            height: "100%",
            position: "center",
            padding: "90px 70px 50px 70px",
            backgroundColor: "rgba(140,83,83,0.9)"


        },

        taskhtml: {
            marginTop: "70px",
            width: "100%",
            height: "100%",
            position: "center",
            padding: "90px 70px 50px 70px",
            backgroundColor: "rgba(140,83,83,0.9)"


        },

        h3: {
            color: "white",
            marginBottom: "30px",
            textAlign: "center"
        },
        h5: {
            marginTop: "20px",
            color: "white",
            fontWeight: "lighter",
            marginBottom: "30px",
            textAlign: "center"
        },
        loginform: {
            minHeight: "345px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d"

        },
        button: {
            display: "inline-block",
            width: "calc(50% - 4px)",
            margin: "0 auto"
        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > label,input,button,a,table': {
                width: "100%",
                color: "#fff",
                marginTop: "30px"
            },
            '&:nth-child(n) > input,button,table,tr': {
                border: "none",
                padding: "15px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,0.1)",
                textAlign: "center",
                alignContent: "center"
            },
            '&:nth-child(n) > input': {
                '&::placeholder': {
                    color: "rgba(184,171,171,0.9)",
                    fontWeight: "bolder"
                }

            },
            '&:nth-child(n) > tr,td': {
                width: "50%",
                padding: "15px 60px",
                alignContent: "center",
                marginTop: 10,
                border: "none",
                margin: "20px"
            },

            '&:nth-child(n) > a': {
                marginTop: "50px",
                border: "none",
                padding: "50px 50px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)",
                width: "100%",
                color: "#fff",
                display: "block"
            },
            '&:nth-child(n) > label ': {
                color: "#aaa",
                fontSize: "12px"
            }
        },


    }))
;

const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});
    const [title, setTitle] = useState();
    const [right, setRight] = useState();
    const [contents, setContents] = useState();
    const {data: user} = useQuery(VacationQuery)

    useEffect(() => {
        if (user) {
            setRight(user.includedVacation);
        }
    }, [user]);

    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    })

    const handleClick = () => {

        localStorage.clear()
        window.location.href = '/login'

    }

    const changeClick = () => {

        if (window.confirm("주문 내용을 재작성하시겠습니까?")) {

            localStorage.removeItem('task')
            window.location.href = '/create'

        }

    }

    const taskClick = () => {
        alert("주문이 생성되었습니다!")
        localStorage.setItem('task', title)
        window.location.href = '/create'
    }


    return localStorage.getItem('task') ? (
        <div className={classes.root}>
            <div className={classes.loginwrap}>
                <div className={classes.taskhtml}>
                    <h2>{localStorage.getItem('name')}님!<br/> 주문 설정이 모두 완료되었습니다.<br/></h2>

                    <h3 className={classes.h5}>이후 주문 관리 페이지에서 주문자 관리/주문 내용<br/> 변경 가능합니다!</h3>


                    <Button variant="contained" id='logout' onClick={changeClick} className={classes.button}>주문
                        변경</Button>
                    <Button variant="contained" color={"secondary"} id='logout' onClick={TaskCreate()}
                            className={classes.button}>완료!</Button>
                </div>
            </div>
        </div>
    ) : (


        <div className={classes.root}>
            <div className={classes.loginwrap}>
                <div className={classes.loginhtml}>

                    <h2>👨🏻‍💻{localStorage.getItem('name')}님 환영합니다.👨🏻‍💻️</h2>
                    <h5 className={classes.h5}>어떤 이유로 커피를 사시나요?</h5>

                    <div className={classes.loginform}>

                        <div className={classes.group}>
                            <label>결제자 </label>
                            <input type="text" placeholder="(예시) 승진, 결혼" onChange={e => setTitle(e.target.value)}
                                   className={classes.input}/>
                            <Button variant="contained" id='logout' onClick={taskClick}
                                    className={classes.button}>주문 생성</Button>
                            <Button variant="contained" id='logout' onClick={handleClick}
                                    className={classes.button}>결제자 설정 페이지로 돌아가고 싶으신가요?</Button>
                        </div>


                    </div>
                </div>
            </div>
        </div>


    );
};

export default AuthenticationForm;