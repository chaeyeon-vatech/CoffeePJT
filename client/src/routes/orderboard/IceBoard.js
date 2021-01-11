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
import {Tab, Tabs} from "@material-ui/core";
import {TabPanel} from "@material-ui/lab";
import {Column, Row} from "simple-flexbox";
import OrderBoard from "./OrderBoard";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import CreateOrder from "./useMutation";

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
    },
    lastRow: {
        marginTop: 30
    },
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
        border: `5px solid #624444`,
        borderRadius: 5,
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: "#373a47",
        width: "50%"
    },
    todayTrends: {
        marginTop: 30
    },
    button: {
        marginLeft: 45
    }
}));

export default function CorderBoard() {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);

    const [contents, setContents] = useState('');
    const [count, setCount] = useState('');

    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Column>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{1024: 'column'}}
            >
                <table className={classes.border}>

                    {contents && contents.map((content) => (
                        <td><span className={classes.itemTitle}>👏  오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! 👏</span>
                        </td>))}
                </table>

            </Row>

            <div className={classes.todayTrends}>
                <div className={classes.root}>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.root}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    centered
                                >
                                    <Tab label="☕ 커피 ☕" href="/order"/>
                                    <Tab label="🍦 아이스크림 🍦" href="/iorder"/>
                                    <Tab label="🥤 기타 음료 🥤" href="/eorder"/>
                                </Tabs>
                            </Paper>

                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image="https://lh3.googleusercontent.com/proxy/3E3fr4CJkTkj2n_LtIhLKFOmiMFbRbV4pRfFtNqNzWfSTW4vDx56RbOXtbgNaNuKAlotVJVcizhmQwWk4MQBAAsGDtOzeQ4HK3KDuSmaSp5zOYbnHf2TDC-gjcsTLFFlCMg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                아시나요
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateOrder hi="icecream" menu="아시나요" color="primary"
                                                     className={classes.button}/>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image="https://img5.yna.co.kr/etc/inner/KR/2017/08/07/AKR20170807054700030_01_i_P2.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                돼지콘
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateOrder hi="icecream" menu="돼지콘" color="primary"
                                                     className={classes.button}/>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image="https://contents.lotteon.com/itemimage/_v100649/LF/15/00/59/6_/0/LF1500596_0_1.jpg/dims/resizemc/400x400"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                브라보
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateOrder hi="icecream" menu="브라보" color="primary"
                                                     className={classes.button}/>
                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="200"
                                            image="https://m.assabeer.com/web/product/big/a_64.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                녹차마루
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <CreateOrder hi="icecream" menu="녹차마루" color="primary" className={classes.button}/>


                                    </CardActions>
                                </Card>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>

            {/*<div className={classes.todayTrends}>*/}
            {/*    <AfterOrder/>*/}
            {/*</div>*/}

        </Column>


    );
}

