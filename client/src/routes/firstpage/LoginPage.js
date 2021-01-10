import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {SearchQuery, TaskQuery} from "../../graphql/query";
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';

const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            paddingTop: "50px",
            backgroundImage: `url("https://jooinn.com/images/cafe-1.jpg")`,
            width: "100%",
            margin: "auto",
            maxWidth: "525px",
            minHeight: "670px",
            position: "relative",
            boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.24),0 17px 50px 0 rgba(0,0,0,.19)"
        },
        loginhtml: {
            width: "100%",
            height: "100%",
            position: "center",
            padding: "90px 70px 50px 70px",
            background: "rgb(95, 59, 59)"

        },

        h3: {
            color: "white",
            marginBottom: "30px",
            textAlign: "center"
        },
        h5: {
            color: "white",
            marginBottom: "30px",
            fontWeight: "lighter",
            textAlign: "center"
        },
        loginform: {
            minHeight: "345px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d"

        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > label,input,button,a,table': {
                width: "100%",
                color: "#fff",
                display: "block",
                margin: "10px 10px"
            },
            '&:nth-child(n) > input,button,table,tr': {
                border: "none",
                padding: "15px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,.1)",
                textAlign: "center",
                alignContent: "center"
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

const handleClick = (name, id) => {
    if (window.confirm(name + '로 로그인하시겠습니까?')) {

        localStorage.setItem('myData', id)
        window.location.href = '/order'
    }
}

const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});

    const [search, setSearch] = useState();
    const [result, setResult] = useState();
    const [tasks, setTasks] = useState();


    const {data} = useQuery(SearchQuery, {
        variables: {
            word: search
        },

    });

    console.log("data", data);

    const {data: task} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setResult(data.user);

        }
    }, [data]);


    useEffect(() => {
        if (task) {
            setTasks(task.tasks);

        }
    }, [task]);


    return (
        <div className={classes.root}>
            <div className={classes.loginwrap}>
                <div className={classes.loginhtml}>


                    {tasks && tasks.map((task) => (
                        <h3>{task.creater}님의 주문이 진행 중입니다.</h3>
                    ))}

                    <h5 className={classes.h5}>주문하시겠습니까?</h5>

                    <div className={classes.loginform}>

                        <div className={classes.group}>
                            <label>주문자 </label>


                            <input type='text' placeholder='이름을 입력하세요.' onChange={e => setSearch(e.target.value)}
                            />

                            <table>
                                {result &&
                                result.map((content) => (
                                    <tr style={{marginBottom: 20}}>

                                        <td>{content.username}</td>
                                        <td>
                                            <a type="submit" onClick={() => handleClick(content.username, content._id)}
                                            >선택</a>
                                        </td>
                                    </tr>

                                ), this)}

                            </table>

                            <a>이름을 입력하시고<br/> 선택 버튼을 누르세요!</a>
                        </div>


                    </div>
                </div>
            </div>
        </div>


    );
};

export default AuthenticationForm;
