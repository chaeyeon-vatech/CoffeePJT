import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Tab, Tabs, useTheme} from "@material-ui/core";
import {TabPanel} from "@material-ui/lab";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {MeQuery, OrderSearch} from "../../graphql/query";
import {CreateMutation} from "../../graphql/mutation";
import CreateOrder from "./useMutation";
import MenuItem from "../../components/sidebar/MenuItemComponent";
import Menu from "../../components/sidebar/MenuComponent";
import UserTable from "../../components/table/UserTable";
import AfterOrder from "./AfterOrder";
import GiveupButton from "../../components/button/GiveupButton";
import DeleteButton from "../../components/button/DeleteButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
    }
}));

export default function CorderBoard() {
    const theme = useTheme();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [menu, setMenu] = useState();
    const [hi, setHi] = useState();
    const [position, setPosition] = useState();
    const [status, setStatus] = useState();
    const [username, setName] = useState();
    const [check, setCheck] = useState();

    const {data} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        }
    });


    useEffect(() => {
        if (data) {
            setName(data.me.username);
            setPosition(data.me.position);
            setStatus(data.me.status);

        }
    }, [data]);

    console.log(username, position, status, menu, hi)

    const createmutation = CreateMutation;


    const [create, error] = useMutation(createmutation, {
            refetchQueries: [{query: OrderSearch, MeQuery}],
            variables: {
                id: localStorage.getItem('myData'),
                menu: menu,
                hi: hi
            },
            onCompleted: (data) => {
                alert("주문이 완료되었습니다!")
                window.location.href = '/order';


            },
            onError: () => {
                alert("메뉴를 선택해주세요.")
            },
        }
    )

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    return (


        <div className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {status != "주문완료" && status != "주문포기" &&
                    <Paper className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            centered
                        >
                            <Tab label="☕ 커피 ☕" href={"/order"}/>
                            <Tab label="🍦 아이스크림 🍦" href={"/iorder"}/>
                            <Tab label="🥤 기타 음료 🥤" href={"/eorder"}/>
                        </Tabs>
                    </Paper>
                    }
                    {status == "주문완료" && <AfterOrder/>}


                </Grid>
                <Grid item xs={3}>
                    {status != "주문완료" && status != "주문포기" &&
                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1593231269103-6667d6905882?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        아메리카노
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="아메리카노" color="secondary"/>
                                <CreateOrder hi="ice" menu="아메리카노" color="primary"/>
                            </CardActions>
                        </Card>
                    </Paper>
                    }
                </Grid>
                <Grid item xs={3}>
                    {status != "주문완료" && status != "주문포기" &&
                    <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1556484245-2c765becb8eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        카페라떼
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="카페라떼" color="secondary"/>
                                <CreateOrder hi="ice" menu="카페라떼" color="primary"/>
                            </CardActions>
                        </Card>
                    </Paper>}
                </Grid>
                <Grid item xs={3}>
                    {status != "주문완료" && status != "주문포기" && <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        바닐라라떼
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="바닐라라떼" color="secondary"/>
                                <CreateOrder hi="ice" menu="바닐라라떼" color="primary"/>
                            </CardActions>
                        </Card>
                    </Paper>}
                </Grid>
                <Grid item xs={3}>
                    {status != "주문완료" && status != "주문포기" && <Paper className={classes.paper}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="200"
                                    image="https://images.unsplash.com/photo-1523247140972-52cc3cdd2715?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        카페 모카
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <CreateOrder hi="hot" menu="카페모카" color="secondary"/>
                                <CreateOrder hi="ice" menu="카페모카" color="primary"/>
                            </CardActions>
                        </Card>
                    </Paper>
                    }
                </Grid>
                <GiveupButton userid={localStorage.getItem("myData")}/>

            </Grid>
        </div>

    );
}

