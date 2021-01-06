import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import OrderBoard from './OrderBoard';
import Task from './Task';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery, CountQuery} from "../../graphql/query";
import AfterOrder from "./AfterOrder";

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        },

    },
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    }
}));


function OrderBoardComponent() {
    const classes = useStyles();

    const [contents, setContents] = useState('');
    const [count, setCount] = useState('');

    const {data: user} = useQuery(AllUserQuery)


    useEffect(() => {
        if (user) {
            setCount(user.allUsers.length);
        }
    }, [user]);

    const {data} = useQuery(CountQuery);
    useEffect(() => {
        if (data) {
            setContents(data.howmany);

        }
    }, [data]);

    return (
        <Column>
            {/*<Row*/}
            {/*    className={classes.cardsContainer}*/}
            {/*    wrap*/}
            {/*    flexGrow={1}*/}
            {/*    horizontal='space-between'*/}
            {/*    breakpoints={{768: 'column'}}*/}
            {/*>*/}
            {/*    <Row*/}
            {/*        className={classes.cardRow}*/}
            {/*        wrap*/}
            {/*        flexGrow={1}*/}
            {/*        horizontal='space-between'*/}
            {/*        breakpoints={{384: 'column'}}*/}
            {/*    >*/}
            {/*        <MiniCardComponent*/}
            {/*            className={classes.miniCardContainer}*/}
            {/*            title='주문'*/}
            {/*            value={contents[0]}*/}
            {/*        />*/}
            {/*        <MiniCardComponent*/}
            {/*            className={classes.miniCardContainer}*/}
            {/*            title='주문 취소'*/}
            {/*            value={contents[1]}*/}
            {/*        />*/}
            {/*    </Row>*/}
            {/*    <Row*/}
            {/*        className={classes.cardRow}*/}
            {/*        wrap*/}
            {/*        flexGrow={1}*/}
            {/*        horizontal='space-between'*/}
            {/*        breakpoints={{384: 'column'}}*/}
            {/*    >*/}
            {/*        <MiniCardComponent*/}
            {/*            className={classes.miniCardContainer}*/}
            {/*            title='주문 포기'*/}
            {/*            value={contents[2]}*/}
            {/*        />*/}

            {/*        <MiniCardComponent*/}
            {/*            className={classes.miniCardContainer}*/}
            {/*            title='미주문'*/}
            {/*            value={count - parseInt(contents[0]) - parseInt(contents[1]) - parseInt(contents[2])}*/}
            {/*        />*/}

            {/*    </Row>*/}
            {/*</Row>*/}

            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{1024: 'column'}}
            >
                <table className={classes.border}>

                    {/*오늘은 ""님이 ""기념으로 "" 쏩니다!*/}
                    <td><span className={classes.itemTitle}>👏  오늘은 ""님이 "" 기념으로 커피 쏩니다! 👏</span></td>
                    {/*<td><span className={classes.itemTitle}>주문 마감 기한: </span></td>*/}
                </table>

            </Row>

            <div className={classes.todayTrends}>
                <OrderBoard/>
            </div>

            <div className={classes.todayTrends}>
                <AfterOrder/>
            </div>

        </Column>
    );
}

export default OrderBoardComponent;
