import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {CupQuery, Receipt} from "../../graphql/query";
import DeleteButton from "../button/DeleteButton";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles((theme) => ({
    content:{
        textAlign:"center",
        textSize:"10px",
       padding:20
    }
}));

function BoardTable() {

    const classes = useStyles();

    const [content, setContent] = useState();

    const {data: receipt} = useQuery(Receipt)
    console.log(receipt);

    useEffect(() => {
        if (receipt) {
            setContent(receipt.receipt)
        }
    })

    return (


        <table>
            <caption>영수증</caption>
            <thead>

                {content &&
                content.map((content) => (
                    <tr className={classes.content}>{content}</tr>

                ))}


            </thead>
        </table>

    )
}

export default BoardTable;
