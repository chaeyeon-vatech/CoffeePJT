import React, {useEffect, useState, Suspense} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {RECEIPT_QUERY, USER_RECEIPT_QUERY} from "../../graphql/query";
import {createUseStyles} from "react-jss";
import {Tooltip} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LoadingComponent from "../loading";

const useStyles = createUseStyles({
    content: {
        textAlign: "center",
        textSize: "10px",
        padding: 10,
        display: "inline-block",
        border: "0.1px solid lightgrey"
    }
});

function BoardTable() {

    const classes = useStyles();
    const [content, setContent] = useState("");
    const [user, setUser] = useState("");
    const [num, setNum] = useState(1);
    const {data} = useQuery(USER_RECEIPT_QUERY, {
        variables: {
            menu: num
        }
    });
    const {data: receipt} = useQuery(RECEIPT_QUERY)


    useEffect(() => {

        if (data) {
            setUser(String(Object.values(data)))
        }

        if (receipt) {
            setContent(receipt.receipt)
        }

    }, [data, receipt])

    return (

        <Suspense fallback={<LoadingComponent loading/> && user}>

            {content &&
            content.map((content, index) => (
                content !== "" && <span key={index} className={classes.content}>
                       <Tooltip title={user} placement="top">
                            <Button variant="outlined"
                                    onMouseOver={() => {
                                        setNum(index)
                                    }}
                            > {content}</Button>
                        </Tooltip>
                    </span>

            ))}


        </Suspense>

    )
}

export default BoardTable;