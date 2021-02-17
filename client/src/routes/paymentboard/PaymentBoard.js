import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import {
    COST_QUERY,
    COUNT_QUERY,
    ME_QUERY, NOT_QUERY,
    SEARCH_QUERY
} from "../../graphql/query";
import PaymentTable from "../../components/table/PaymentTable";
import {ORDER_CONFIRM_MUTATION} from "../../graphql/mutation";
import {Tooltip} from "@material-ui/core";
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5
    },
    tableSection: {
        padding: 24
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
        width: '100%',
        marginTop: 10,
        marginBottom: 20
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
    button: {
        marginBottom: "20px"
    }
}));


function PaymentBoard() {
    const theme = useTheme();
    const classes = useStyles({theme});
    const {enqueueSnackbar} = useSnackbar();
    const client = useApolloClient();

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        money: "",
        order: "",
        id: "",
        pa: ""
    })

    useEffect(() => {
        setLoading(true);
        runQuery();
        return () => {
            setLoading(false);
        }
    }, [])

    async function runQuery() {

        const cost = await client.query({query: COST_QUERY})
        const count = await client.query({query: COUNT_QUERY})
        const me = await client.query({query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}})
        const not = await client.query({query: NOT_QUERY});

        setState({
            ...state,
            money: cost?.data.howmuch,
            order: count?.data.howmany,
            id: me?.data.me._id,
            pa: not?.data.includedNothing
        })

        return state
    }

    const [deletePostOrMutation] = useMutation(ORDER_CONFIRM_MUTATION, {
            refetchQueries: [{query: SEARCH_QUERY}],
            variables: {creater: state.id},
            onCompleted: () => {
                enqueueSnackbar("주문이 초기화되었습니다.")
                localStorage.clear();
                window.location.href = '/login';
            },
            onError: () => {
                enqueueSnackbar("초기화 권한이 없습니다.")
                window.location.href = '/order';
            },
        }
    )


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
        <>

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
                    className={classes.tableSection}
                    breakpoints={{1024: {width: 'calc(100% - 48px)', flexBasis: 'auto'}}}
                >
                    <PaymentTable/>
                </Column>
                <Column className={classes.separator} breakpoints={{1024: {display: 'none'}}}>
                    <div/>
                </Column>
                <Column flexGrow={3} flexBasis='342px' breakpoints={{1024: classes.stats}}>
                    {renderStat('누적 금액', state.money)}
                    {renderStat('미주문자', <Tooltip title={state && state.pa &&
                    state.pa.map(c => c.username).join(',')} placement="top">
                        <Button variant="outlined">{state.order[3]}</Button>
                    </Tooltip>)}

                    {renderStat('결제 완료', <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        onClick={deletePostOrMutation}
                    >결제 완료</Button>)}
                </Column>
            </Row>
        </>

    );
}

export default PaymentBoard;