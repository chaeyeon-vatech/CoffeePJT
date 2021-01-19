import React from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import UserBoard from './UserBoard';

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -50
    },
    cardRow: {
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            // marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 0
    },

    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {}
    }
});

function UserboardComponent() {
    const classes = useStyles();


    return (
        <Column>
            <div className={classes.todayTrends}>
                <UserBoard/>
            </div>
        </Column>
    );
}

export default UserboardComponent;
