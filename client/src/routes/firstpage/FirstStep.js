import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import TransferList from "../../components/table/TransferTable";


const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            width: "100%",
            marginLeft: "230px",
            maxWidth: "525px",
            minHeight: "670px",
            position: "relative",
            boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.24),0 17px 50px 0 rgba(0,0,0,.19)"
        },
        loginhtml: {
            marginTop: "30px",
            width: "200%",
            height: "100%",
            position: "center",
            padding: "90px 30px 50px 10px",
            backgroundColor: "rgba(140,83,83,0.9)"

        },

        h3: {
            color: "white",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "30px"
        },
        h5: {
            color: "white",
            fontWeight: "lighter",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "18px"
        },
        loginform: {
            minHeight: "345px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d"

        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > label,input,a,table': {
                width: "100%",
                color: "#fff",
                marginTop: "30px"
            },
            '&:nth-child(n) > input,button,table,tr': {
                border: "none",
                padding: "15px 20px",
                borderRadius: "25px",
                background: "rgba(255,255,255,0.6)",
                textAlign: "center",
                alignContent: "center",
                marginTop: "30px",
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
                border: "none"
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

    localStorage.setItem('myData', id)
    localStorage.setItem('name', name)
    window.location.href = '/create'
}

const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});
    const [contents, setContents] = useState();


    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    })


    return (


        <div className={classes.root}>
            <div className={classes.loginwrap}>
                <div className={classes.loginhtml}>

                    <h2>👨🏻‍💻{localStorage.getItem('name')}님 환영합니다.👨🏻‍💻️</h2>
                    <h5 className={classes.h5}>미주문자/주문자 선택 후 버튼으로 변환해주세요.</h5>

                    <div className={classes.loginform}>

                        <div className={classes.group}>
                            <TransferList/>
                        </div>


                    </div>
                </div>
            </div>
        </div>


    );
};

export default AuthenticationForm;