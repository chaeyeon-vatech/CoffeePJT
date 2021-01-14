import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import OrderBoard from './OrderBoard';
import Task from './Task';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery, CountQuery, TaskQuery} from "../../graphql/query";
import AfterOrder from "./AfterOrder";

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30,
        // marginTop: -30
    },
    background: {
        backgroundColor: 'rgba(246,244,244,0.9)',
        padding: "45px 45px 45px 45px"
    },
    cardRow: {
        '@media (max-width: 768px)': {
            // marginTop: 0
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
    // lastRow: {
    //     marginTop: 30,
    // },
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
        // ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    }
}));


function OrderBoardComponent() {
    const classes = useStyles();

    const [contents, setContents] = useState('');
    const [count, setCount] = useState('');

    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);

    console.log(contents)


    return (
        <Column className={classes.background}>

            <Row
                horizontal='space-between'
                breakpoints={{1024: 'column'}}
            >
                <table className={classes.border}>

                    {contents && contents.map((content) => (
                        <td><span className={classes.itemTitle}>👏  오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! 👏</span>
                        </td>))}
                </table>

            </Row>

            <div className={classes.todayTrends}>
                <OrderBoard/>
            </div>


        </Column>
    );
}

export default OrderBoardComponent;
