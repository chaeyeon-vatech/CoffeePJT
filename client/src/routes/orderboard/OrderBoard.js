import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import {MeQuery} from "../../graphql/query";
import CreateOrder from "./useBoard";
import GiveupButton from "../../components/button/GiveupButton";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
    },
    containerMobile: {
        padding: '24px 32px 12px 32px !important'
    },
    itemContainerMobile: {
        marginLeft: -30,
        marginRight: -30,
        paddingLeft: 30,
        paddingRight: 30,
        width: "1235px",
    },
    media: {
        cursor: "default"
    }
}));

const menu = [{
    menu: "아메리카노",
    image: "https://images.unsplash.com/photo-1593231269103-6667d6905882?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80"
},
    {
        menu: "카페라떼",
        image: "https://images.unsplash.com/photo-1556484245-2c765becb8eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
    },
    {
        menu: "바닐라라떼",
        image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
    },
    {
        menu: "카페모카",
        image: "https://images.unsplash.com/photo-1523247140972-52cc3cdd2715?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
    }]

export default function CorderBoard() {

    const theme = useTheme();
    const classes = useStyles({theme});
    const [status, setStatus] = useState("");

    // const {userContext, dispatchUser} = useContext(UserContext)

    // console.log(userContext)

    const {data} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        }
    });

    useEffect(() => {
        if (data) {
            setStatus(data.me.status);
        }
    }, [data]);

    return (


        <>

            <Grid container spacing={3} horizontal='center'
                  breakpoints={{300: classes.itemContainerMobile}}>

                <Grid container spacing={3}>

                    {menu.map((value, index) => (
                        <Grid key={index} item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="230"
                                            className={classes.media}
                                            image={value.image}
                                        />
                                        <CardContent className={classes.media}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {value.menu}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>

                                        <CreateOrder hi="hot" menu={value.menu} color="secondary" label="Hot"/>
                                        <CreateOrder hi="ice" menu={value.menu} color="primary" label="Ice"/>

                                    </CardActions>
                                </Card>
                            </Paper>

                        </Grid>
                    ))}
                </Grid>

                {status === "대기중" && (
                    <GiveupButton userid={localStorage.getItem("myData")}/>
                )}

            </Grid>
        </>

    );
}