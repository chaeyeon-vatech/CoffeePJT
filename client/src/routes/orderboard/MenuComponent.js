import React from 'react';
import {Column} from 'simple-flexbox';
import {createUseStyles} from 'react-jss';
import MenuBoard from "./Menu";

const useStyles = createUseStyles((theme) => ({
    cardsContainer: {},
    background: {
        backgroundColor: 'rgba(248,246,243,0.5)',
        padding: "45px 45px 45px 45px",
        marginTop: "20px"
    },
    miniCardContainer: {
        flexGrow: 1,
        '@media (max-width: 600px)': {
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    unresolvedTickets: {
        '@media (max-width: 1000px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1000px)': {
            marginTop: 30
        },

    },
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
        textAlign: "center",
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        color: theme.color.veryDarkGrayishBlue,
        width: "100%",
        padding: "10px 10px 10px 10px",
        marginBottom: "20px"
    },
    itemTitle: {
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    },
}));


function OrderBoardComponent() {
    const classes = useStyles();

    return (

        <Column className={classes.background}
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">

            <MenuBoard className={classes.itemContainerMobile}/>


        </Column>


    );
}

export default OrderBoardComponent;