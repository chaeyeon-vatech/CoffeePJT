import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {CupQuery, Receipt, ReceiptUsers} from "../../graphql/query";
import DeleteButton from "../button/DeleteButton";
import {createUseStyles} from "react-jss";
import {Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const useStyles = createUseStyles((theme) => ({
    content: {
        textAlign: "center",
        textSize: "10px",
        padding: 20
    }
}));

function BoardTable() {

    const classes = useStyles();

    const [count, setCount] = useState();

    const [content, setContent] = useState();

    const [user, setUser] = useState();

    const {data: receipt} = useQuery(Receipt)

    useEffect(() => {
        if (receipt) {
            setContent(receipt.receipt)
        }
    })


    const {data} = useQuery(ReceiptUsers, {variables: {num: count}})

    useEffect(() => {
        if (data) {
            setUser(data.receiptUsers)
        }
    })

    return (


        <table>
            <caption>영수증</caption>
            <thead>

            {content &&
            content.map((content) => (
                <tr className={classes.content}>
                    <Tooltip title="hello" placement="top">
                        <Button> {content}</Button>
                    </Tooltip></tr>

            ))}

            </thead>
        </table>

    )
}

export default BoardTable;
