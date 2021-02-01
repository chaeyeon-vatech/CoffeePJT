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
import {Column, Row} from "simple-flexbox";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import CreateButton from "./useBoard";
import Emoji from "../../components/alert/Emoji";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: "default"
    },
    card: {
        maxWidth: 345,

    },
    color: {
        brown: "#6d4c41"
    },
    background: {
        backgroundColor: 'rgba(246,244,244,0.9)',
        padding: "45px 45px 45px 45px",
        marginTop: "20px"
    },
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
        textAlign: "center",
        border: `5px solid #624444`,
        borderRadius: 5,
        width: "100%",
        padding: "10px 10px 10px 10px"
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: "#373a47",
        width: "50%"
    },
    ordercard: {
        marginTop: 30
    },
    button: {
        display: "grid",
        justifyContent: "center",
        textAlign: "center"
    },
    media: {
        cursor: "default",
        fontSize: '18px !important'
    }
}));

const menu = [
    {
        menu: "아이스티",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
    },
    {
        menu: "망고 요거트 스무디",
        image: "https://images.unsplash.com/photo-1524156868115-e696b44983db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1946&q=80",
    },
    {
        menu: "딸기 요거트 스무디",
        image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",

    },
    {
        menu: "플레인 요거트 스무디",
        image: "https://images.unsplash.com/photo-1577118202736-22e9be066d95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",

    }]

export default function EtcBoard() {
    const classes = useStyles();
    const [contents, setContents] = useState('');

    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);

    return (
        <Column className={classes.background}>
            <Row
                horizontal='space-between'
                breakpoints={{1024: 'column'}}
            >


                {contents && contents.map((content) => (
                    <span
                        key={content} className={classes.border}><Emoji
                        symbol="👏"/> 오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! <Emoji
                        symbol="👏"/></span>
                ))}


            </Row>

            <div className={classes.ordercard}>
                <div className={classes.root}>

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
                                                <Typography gutterBottom variant="h5" component="h2"
                                                            className={classes.media}>
                                                    {value.menu}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>

                                            <CreateButton hi="etc" menu={value.menu} color="primary"
                                                          label="기타 음료 주문"
                                                          className={classes.button}/>

                                        </CardActions>
                                    </Card>
                                </Paper>

                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>

        </Column>


    );
}

