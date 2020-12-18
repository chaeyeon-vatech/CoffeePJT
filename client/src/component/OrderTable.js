import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import SearchBar from "./SearchBar";


const useStyles = makeStyles({
    root: {
        width: "100%",
        marginTop: "30px"
    },
    bullet: {
        margin: '30 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12,
    },
});

function OrderTable() {
    const classes = useStyles();

    return (
        <section className="container">
            <div className="left-half">
                <h1 className="table-title">주문자 현황</h1>

                <SearchBar/>
                <article>

                    <table className="employees-table">
                        <thead className="employees-table-head">
                        <tr>
                            <th>이름</th>
                            <th>시간</th>
                            <th>메뉴</th>
                            <th>취소</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody className="employees-table-body">


                        <tr style={{marginBottom: 20}}>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td><i className="fa fa-trash fa-lg"></i></td>
                        </tr>


                        </tbody>


                    </table>

                </article>
            </div>


            <div class="right-half">
                <h1 className="table-title">커피 주문</h1>
                <article>

                    <div className="wrap">
                        <a className="btn-0" href="/login">
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        ☕ 아메리카노 : 1500원
                                    </Typography>
                                </CardContent>
                            </Card>

                        </a>
                        <a className="btn-1" href="#">
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        ☕ 아메리카노 : 1500원
                                    </Typography>
                                </CardContent>
                            </Card></a>
                    </div>



                    {/*<section title=".squaredOne">*/}
                    {/*    <div className="squaredOne">*/}
                    {/*        <input type="checkbox" value="None" id="squaredOne" name="check" placeholder=" ☕ 아메리카노 : 1500원" checked/>*/}
                    {/*        <label htmlFor="squaredOne"></label>*/}
                    {/*    </div>*/}
                    {/*</section>*/}


                </article>
            </div>


        </section>

    )
}

export default OrderTable;
