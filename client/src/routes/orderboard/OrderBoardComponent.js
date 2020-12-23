import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import TodayTrendsComponent from './OrderBoard';
import UnresolvedTicketsComponent from './UnresolvedTicketsComponent';
import TasksComponent from './TasksComponent';
import {useAuthToken} from '../../auth/authToken';
import {useUserQuery} from '../../auth/useUserQuery';
import Private from '../../auth/Private';
import {CountMutation} from "../../util/mutation";
import {useMutation} from "@apollo/react-hooks";
import {Search} from "semantic-ui-react";
import {useQuery} from "@apollo/react-hooks";
import {SearchQuery} from "../../util/graphql";

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

function OrderBoardComponent() {
    const classes = useStyles();

    const [contents, setContents] = useState('');
    const mutation = CountMutation;


    const [count, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: SearchQuery}]
        }
    )


    console.log(contents)

    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{768: 'column'}}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{384: 'column'}}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Open'
                        value='23'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='미주문자'
                        value='16'
                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{384: 'column'}}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='주문자'
                        value='43'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='취소자'
                        value='64'
                    />
                </Row>
            </Row>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{1024: 'column'}}
            >
                <TasksComponent containerStyles={classes.tasks}/>
            </Row>

            <div className={classes.todayTrends}>
                <TodayTrendsComponent/>
            </div>

        </Column>
    );
}

export default OrderBoardComponent;
