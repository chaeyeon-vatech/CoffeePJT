import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import TodayTrendsComponent from './PaymentBoard';
import TasksComponent from './TasksComponent';
import {useUserQuery} from '../../auth/useUserQuery';
import {useQuery} from "@apollo/react-hooks";
import {CountQuery} from "../../util/query";

const useStyles = createUseStyles({
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
    }
});

function PaymentboardComponent() {
    const classes = useStyles();


    return (
        <Column>

            <div className={classes.todayTrends}>
                <TodayTrendsComponent/>
            </div>

        </Column>
    );
}

export default PaymentboardComponent;
