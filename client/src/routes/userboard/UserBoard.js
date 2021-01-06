import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import UserTable from '../../components/table/UserTable';
import {useQuery} from "@apollo/react-hooks";
import {MeQuery} from "../../graphql/query";
import Task from "./Task";
import BoardTable from "../../components/table/BoardTable";


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
    },  lastRow: {
        marginBelow: 200
    },
}));

function UserBoard() {
    const theme = useTheme();
    const classes = useStyles({theme});

    const [contents, setContents] = useState('');
    const [username, setName] = useState();
    const [id, setId] = useState();

    const {data, loading} = useQuery(MeQuery);

    useEffect(() => {
        if (data) {
            setContents(data.me);
            setName(data.me.username);
            setId(data.me.idNum);
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

        <Column>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{1024: 'column'}}
            >
                <Task/>

            </Row>

            <Row
                flexGrow={1}
                className={classes.container}
                horizontal='center'
                breakpoints={{1024: 'column'}}
            >


                <Column
                    wrap
                    flexGrow={7}
                    flexBasis='735px'
                    className={classes.graphSection}
                    breakpoints={{1024: {width: 'calc(100% - 48px)', flexBasis: 'auto'}}}
                >
                    <BoardTable/>
                </Column>
                <Column className={classes.separator} breakpoints={{1024: {display: 'none'}}}>
                    <div/>
                </Column>
                <Column flexGrow={3} flexBasis='342px' breakpoints={{1024: classes.stats}}>
                    {renderStat('이름', username)}
                    {renderStat('이메일', id)}
                    {renderStat('소속', '플랫폼 사업팀')}

                </Column>
            </Row>
        </Column>
    );
}

export default UserBoard;
