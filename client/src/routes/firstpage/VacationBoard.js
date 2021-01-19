import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import {useQuery} from "@apollo/react-hooks";
import {
    SearchQuery,
    TaskQuery
} from "../../graphql/query";
import TransferList from "../../components/table/TransferTable";

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        cursor: 'pointer'
    },
    graphContainer: {
        marginTop: 24,
        marginLeft: 0,
        marginRight: 0,
        width: '100%'
    },
    graphSection: {
        padding: 24
    },
    graphSubtitle: {
        ...theme.typography.smallSubtitle,
        color: theme.color.grayishBlue2,
        marginTop: 4,
        marginRight: 8
    },
    graphTitle: {
        ...theme.typography.cardTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    legendTitle: {
        ...theme.typography.smallSubtitle,
        fontWeight: '600',
        color: theme.color.grayishBlue2,
        marginLeft: 8
    },
    separator: {
        backgroundColor: theme.color.lightGrayishBlue2,
        width: 1,
        minWidth: 1
    },
    statContainer: {
        borderBottom: `1px solid ${theme.color.lightGrayishBlue2}`,
        padding: '24px 32px 24px 32px',
        height: 'calc(114px - 48px)',
        '&:last-child': {
            border: 'none'
        }
    },
    stats: {
        borderTop: `1px solid ${theme.color.lightGrayishBlue2}`,
        width: '100%'
    },
    statTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '22px',
        letterSpacing: '0.3px',
        textAlign: 'center',
        color: theme.color.grayishBlue2,
        whiteSpace: 'nowrap',
        marginBottom: 6
    },
    statValue: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.color.veryDarkGrayishBlue
    },
    input: {
        border: "none",
        padding: "15px 20px",
        borderRadius: "25px",
        background: "rgba(255,255,25q5,.1)",
        textAlign: "center",
        alignContent: "center"
    }
}));

function VacationBoard() {
    const theme = useTheme();
    const classes = useStyles({theme});

    return (
        <Row
            flexGrow={2}
            className={classes.container}
            horizontal='center'
            breakpoints={{1024: 'column'}}
        >

            <TransferList/>

        </Row>
    );
}

export default VacationBoard;
