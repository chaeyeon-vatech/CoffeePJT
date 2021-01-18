import {CreateMutation} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {MeQuery, Ordermine, OrderSearch} from "../../graphql/query";
import React, {useState} from "react";
import {Tab, Tabs, TextField, useTheme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
    }
}));

export function CreateOrder(hi) {

    const createmutation = CreateMutation;
    const theme = useTheme();
    const classes = useStyles();

    const [create, error] = useMutation(createmutation, {
            refetchQueries: [{query: OrderSearch, MeQuery}],
            variables: {
                id: localStorage.getItem('myData'),
                menu: hi.menu,
                hi: hi.hi
            },
            onCompleted: (data) => {
                alert("주문이 완료되었습니다!")
                window.location.href = '/order';


            },
            onError: () => {
                alert("메뉴를 선택해주세요.")
            },
        }
    )


    return (
        <>
            <Button
                type='submit'
                color={hi.color}
                onClick={create}>
                {hi.label}
            </Button>
        </>


    )
}

export default CreateOrder;