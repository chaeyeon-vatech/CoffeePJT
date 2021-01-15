import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {SearchQuery, TaskQuery} from "../../graphql/query";
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import {Autocomplete} from "@material-ui/lab";
import Typography from '@material-ui/core/Typography';

import {Input, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const useStyles = createUseStyles((theme) => ({

        focused: {
            textAlign: "center",
            "& $notchedOutline": {
                borderColor: "yellow"
            }
        },
        loginwrap: {
            color: "white",
            fontWeight: "lighter",
            textAlign: "center",
            paddingTop: "10px",
            width: "100%",
            margin: "auto",
            maxWidth: "525px",
            minHeight: "300px",
            position: "relative",
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
            backgroundColor: "rgba(140,83,83,0.9)",
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
            // perspective: "1000px",
            transformStyle: "preserve-3d",
            backgroundColor: "rgba(140,83,83,0.9)",
            marginBottom: "20px",
            padding:"20 20 20 20",
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
                marginBottom:"30px"
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
                fontSize:"15px"
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
    // if (window.confirm(name + '님 새로운 주문을 생성하시겠습니까?')) {

    localStorage.setItem('myData', id)
    localStorage.setItem('name', name)
    window.location.href = '/'
    // }
}


const handleLogout = () => {

    localStorage.clear()
    window.location.href = '/'

}

// const options = ['Option 1', 'Option 2'];


const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});

    const [search, setSearch] = useState();
    const [result, setResult] = useState([]);
    const [inputValue, setInputValue] = useState();

    const {task} = useQuery(TaskQuery);

    const {data} = useQuery(SearchQuery, {
        variables: {
            word: search
        },

    });

    useEffect(() => {
        if (data) {
            setResult(data.user);

        }
    }, [data]);


    return (
        <div className={classes.root}>
            <div>
                {localStorage.getItem('name') ? (
                    <div className={classes.root}>
                        <div className={classes.confirmwrap}>

                            <div className={classes.loginafter}>
                                <h3 className={classes.h5}>{localStorage.getItem('name') + "님 환영합니다"}</h3>
                                <h5 className={classes.h5}>{localStorage.getItem('name') + "님이 맞으신가요?"}</h5>

                                <Button variant="contained" id='logout' onClick={()=>window.location.href = '/create'}
                                        className={classes.button}>{localStorage.getItem('name') + "님이 맞습니다!"}</Button>
                                <Button variant="contained" id='logout' onClick={handleLogout}
                                        className={classes.button}>아닙니다.</Button>

                                {/*</div>*/}
                            </div>


                        </div>

                    </div>
                ) : (
                    <div className={classes.root}>
                        <div className={classes.loginwrap}>

                            <div className={classes.loginhtml}>
                                <h3>현재 주문이 없습니다.</h3>
                                <h5 className={classes.h5}>주문을 생성하시려면<br/>이름을 입력해주세요!</h5>

                                <div className={classes.loginform}>

                                    <div className={classes.group}>
                                        <label>결제자 </label>
                                        <Typography component="div" variant="body1">

                                            <Autocomplete
                                                freeSolo
                                                id="free-solo-2-demo"
                                                disableClearable
                                                options={result.map((content) => content.username)}
                                                inputValue={inputValue}
                                                onInputChange={(event, newInputValue) => {
                                                    setInputValue(newInputValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        margin="normal"
                                                        color={"secondary"}
                                                        onChange={e => setSearch(e.target.value)}
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
                                                onClick={() => handleClick(inputValue, result.map((content) => (content._id)))}
                                        >Login</Button>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
};

export default AuthenticationForm;
