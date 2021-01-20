import React, {useEffect, useState} from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import PaymentBoard from './PaymentBoard';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";


const useStyles = createUseStyles((theme) => ({
    cardsContainer: {
        marginRight: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        // marginRight: 30,
        '@media (max-width: 768px)': {
            // marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
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
            // marginTop: 30
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

    const [contents, setContents] = useState('');
    const {data} = useQuery(TaskQuery);
    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);

    return (


        <Column>
            <table className={classes.border}>

                {contents && contents.map((content) => (
                    <td><span
                        className={classes.itemTitle}>👏  결제자 {content.creater}님 환영합니다!👏</span>
                    </td>))}
            </table>

            <div className={classes.todayTrends}>
                <PaymentBoard/>
            </div>

        </Column>
    );
}

export default PaymentboardComponent;
