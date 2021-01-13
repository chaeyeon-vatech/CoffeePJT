import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {SearchQuery, TaskQuery} from "../../graphql/query";
import {createUseStyles, useTheme} from "react-jss";
import '../../components/table/table.css';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";


const useStyles = createUseStyles((theme) => ({

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
            boxShadow: "0 12px 15px 0 rgba(0, 0, 0, 0.24),0 17px 50px 0 rgba(0,0,0,.19)"
        },
        loginhtml: {
            width: "100%",
            height: "100%",
            position: "center",
            padding: "80px 70px 50px 70px",
            backgroundColor: "rgb(42,47,34,0.9)"

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
            '&:nth-child(n) > label,input,button,a,table': {
                width: "100%",
                color: "#fff"
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
    if (window.confirm(name + '님 새로운 주문을 생성하시겠습니까?')) {

        localStorage.setItem('myData', id)
        localStorage.setItem('name', name)
        window.location.href = '/'
    }
}

// const options = ['Option 1', 'Option 2'];


const AuthenticationForm = () => {

    const theme = useTheme();
    const classes = useStyles({theme});

    const [search, setSearch] = useState();
    const [result, setResult] = useState([]);

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

    console.log(result);

    const top100Films = [
        {title: 'The Shawshank Redemption', year: 1994},
        {title: 'The Godfather', year: 1972},
        {title: 'The Godfather: Part II', year: 1974},
        {title: 'The Dark Knight', year: 2008},
        {title: '12 Angry Men', year: 1957},
        {title: "Schindler's List", year: 1993},
        {title: 'Pulp Fiction', year: 1994},
        {title: 'The Lord of the Rings: The Return of the King', year: 2003},
       ]

    return (
        <div className={classes.root}>
            <div>
                {localStorage.getItem('name') ? (
                    <div className={classes.root}>
                        <div className={classes.loginwrap}>

                            <div className={classes.loginafter}>
                                <h3 className={classes.h5}>{localStorage.getItem('name') + "님 환영합니다"}</h3>
                                <h5 className={classes.h5}>{localStorage.getItem('name') + "님이 맞으신가요?"}</h5>
                                <div className={classes.group}>

                                </div>

                            </div>
                        </div>

                    </div>
                ) : (
                    <div className={classes.root}>
                        <div className={classes.loginwrap}>

                            <div className={classes.loginhtml}>
                                <h3>현재 주문이 없습니다.</h3>
                                <h5 className={classes.h5}>주문을 생성하시려면<br/>이름 검색 후 클릭해주세요!</h5>

                                <div className={classes.loginform}>

                                    <div className={classes.group}>
                                        <label>결제자 </label>
                                        {/*<Autocomplete*/}
                                        {/*    id="combo-box-demo"*/}
                                        {/*    options={result}*/}
                                        {/*    getOptionLabel={(option) => option.username}*/}
                                        {/*    style={{ width: 300 }}*/}
                                        {/*    renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}*/}
                                        {/*/>*/}

                                        <input type='text' placeholder='이름을 입력하세요.'
                                               onChange={e => setSearch(e.target.value)}
                                        />

                                        <Autocomplete
                                            freeSolo
                                            id="free-solo-2-demo"
                                            disableClearable
                                            options={result.map((content) => content.username)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search input"
                                                    margin="normal"
                                                    variant="outlined"
                                                    onChange={e => setSearch(e.target.value)}
                                                    InputProps={{...params.InputProps, type: 'search'}}
                                                />
                                            )}
                                        />

                                        <table>
                                            {result &&
                                            result.map((content) => (
                                                <tr style={{marginBottom: 20}}>

                                                    <td>

                                                        <a type="submit"
                                                           onClick={() => handleClick(content.username, content._id)}
                                                        >{content.username}</a>
                                                    </td>
                                                </tr>

                                            ), this)}

                                        </table>
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
