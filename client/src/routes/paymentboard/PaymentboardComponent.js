import React from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import PaymentBoard from './PaymentBoard';


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
        }
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

function PaymentboardComponent() {
    const classes = useStyles();


    return (



        <Column>
            <table className={classes.border}>

                {/*오늘은 ""님이 ""기념으로 "" 쏩니다!*/}
                <td><span className={classes.itemTitle}>Task Title: 👏  오늘은 ""님이 "" 기념으로 커피 쏩니다! 👏</span></td>
                <td><span className={classes.itemTitle}>결제자 : OOO 님</span></td>
                {/*<td><span className={classes.itemTitle}>주문 마감 기한: </span></td>*/}
            </table>

            <div className={classes.todayTrends}>
                <PaymentBoard/>
            </div>

        </Column>
    );
}

export default PaymentboardComponent;
