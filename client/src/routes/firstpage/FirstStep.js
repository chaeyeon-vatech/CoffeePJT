import React from 'react';
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import TransferList from "../../components/table/TransferTable";
import SuccessAlert from "../../components/alert/SuccessAlert";


const useStyles = createUseStyles((theme) => ({

        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",

            paddingTop: "10px",
            width: "100%",
            maxWidth: "1300px",
            minHeight: "300px",
            position: 'absolute',
            left: '45%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            '@media (max-width: 650px)': {

            },
            '@media (max-width: 1000px)': {

            }

        },
        loginhtml: {
            width: "100%",
            height: "100%",
            position: "center",
            marginLeft: "150px",
            marginTop: "-50px",
            padding: "80px 70px 50px 70px",
            backgroundColor: theme.color.red,

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
            marginTop: "50px",
            minHeight: "200px",
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d",
            backgroundColor: "rgb(42,47,34,0.9)"
        },

        group: {
            marginBottom: "15px",
            '&:nth-child(n) > TextField,label,input,button,a,table': {
                width: "100%",
                color: "#fff",
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
                background: "rgba(255,255,255,.1)",
                width: "100%",
                color: "#fff",
                display: "block"
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
        }
    }))
;

const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});

    return (


        <>
            <SuccessAlert message="미주문자(휴가자/결근자/기타사유)/주문자를 구별하여 버튼을 이용하여 양 옆으로 상태 변환이 가능합니다!"
                          button="주문자/미주문자 페이지란?"/>
            <div className={classes.root}
            >
                <div className={classes.loginwrap}>
                    <div className={classes.loginhtml}>


                        <h2 className={classes.margin}>{localStorage.getItem('name')}님 환영합니다.</h2>

                        <div className={classes.loginform}>

                            <div className={classes.group}>
                                <TransferList/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default AuthenticationForm;