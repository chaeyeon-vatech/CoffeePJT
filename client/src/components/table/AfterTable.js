import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {MeQuery, OrderSearch} from "../../graphql/query";
import DeleteButton from "../button/DeleteButton";
import ChangeGiveupButton from "../button/ChangeGiveup";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Emoji from "../alert/Emoji";

const useStyles = makeStyles({
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '19px !important',
        textAlign: "center",
        border: `5px solid #624444`,
        borderRadius: 5,
        width: "100%",
        padding: "15px 15px 15px 15px"
    },
    title: {
        textAlign: "center",
        fontSize: '30px',
        marginBottom: "30px",
        fontWeight: "600",
    }
})

export default function BoardTable() {

    const classes = useStyles();

    const [contents, setContents] = useState('');
    const [status, setStatus] = useState();


    const {data} = useQuery(OrderSearch, {
        variables: {
            id: localStorage.getItem('myData')

        }
    });

    useEffect(() => {
        if (data) {
            setContents(data.orderMine);
        }
    }, [data]);

    const {data: me} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        }
    });


    useEffect(() => {
        if (me) {
            setStatus(me.me.status);

        }
    }, [me]);


    return status === "주문포기" ? (
        <>

            <table aria-labelledby="form-dialog-title">


                <thead>
                <tr>
                    <th scope="col"><ChangeGiveupButton userid={localStorage.getItem("myData")}/></th>

                </tr>
                </thead>

            </table>
        </>
    ) : (
        <>
            <Typography variant={"h5"} className={classes.title}><Emoji symbol="📋"/> 주문 완료 <Emoji
                symbol="📋"/></Typography>

            {contents && contents.map((content) => (
                <span className={classes.border} key={content} style={{marginBottom: 20}}>
                         {content.username}님의 주문내역 : {content.hi} {content.menu}
                    </span>

            ))}
            {contents && contents.map((content) => (
                <DeleteButton key={content} userid={localStorage.getItem("myData")} orderid={content._id}/>

            ))}


        </>
    );
}
