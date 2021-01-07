import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import {useQuery, useMutation} from "@apollo/react-hooks";
import {
    AllUserQuery,
    CostQuery,
    CountQuery,
    MeQuery,
    SearchQuery,
    TaskQuery,
    UserSearchQuery
} from "../../graphql/query";
import PaymentTable from "../../components/table/PaymentTable";
import {OrderConfirmMutation, OrderGiveupMutation} from "../../graphql/mutation";
import {TextField} from "@material-ui/core";
import VacationTable from "../../components/table/VacationTable";
import SearchTable from "../../components/table/SearchTable";

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
    input:{
        border: "none",
        padding: "15px 20px",
        borderRadius: "25px",
        background: "rgba(255,255,25q5,.1)",
        textAlign: "center",
        alignContent: "center"
    }
}));

function TodayTrendsComponent() {
    const theme = useTheme();
    const classes = useStyles({theme});

    const [search, setSearch] = useState();
    const [result, setResult] = useState();

    const {task} = useQuery(TaskQuery);

    const {data} = useQuery(SearchQuery, {
        variables: {
            word: search
        },

    });

    useEffect(() => {
        if (data) {
            setResult(data.user);

        }
    }, [data]);



    function renderLegend(color, title) {
        return (
            <Row vertical='center'>
                <div style={{width: 16, border: '2px solid', borderColor: color}}></div>

                <span className={classes.legendTitle}>{title}</span>
            </Row>
        );
    }

    function renderStat(title, value) {
        return (
            <Column
                flexGrow={1}
                className={classes.statContainer}
                vertical='center'
                horizontal='center'
            >
                <span className={classes.statTitle}>{title}</span>
                <span className={classes.statValue}>{value}</span>
            </Column>
        );
    }

    return (
        <Row
            flexGrow={2}
            className={classes.container}
            horizontal='center'
            breakpoints={{1024: 'column'}}
        >
            <Column
                wrap
                flexGrow={5}
                flexBasis='735px'
                className={classes.graphSection}
                breakpoints={{1024: {width: 'calc(100% - 48px)', flexBasis: 'auto'}}}
            >
               <SearchTable/>
            </Column>
            <Column className={classes.separator} breakpoints={{1024: {display: 'none'}}}>
                <div/>
            </Column>
            <Column
                wrap
                flexGrow={5}
                flexBasis='735px'
                className={classes.graphSection}
                breakpoints={{1024: {width: 'calc(100% - 48px)', flexBasis: 'auto'}}}
            >
                <VacationTable/>
            </Column>
        </Row>
    );
}

export default TodayTrendsComponent;
