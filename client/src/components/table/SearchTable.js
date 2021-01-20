import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useQuery} from "@apollo/react-hooks";
import {SearchQuery} from "../../graphql/query";
import FormDialog from "../dialog/UpdateUser";
import UserDeleteButton from "../button/UserDeleteButton";


export default function SearchTable(search) {


    const [open, setOpen] = React.useState(false);
    const [result, setResult] = useState();


    const {data: se} = useQuery(SearchQuery, {
        variables: {
            word: search.search
        },

    });


    useEffect(() => {
        if (se) {
            setResult(se.user);

        }
    }, [se]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/*<Button variant="outlined" onClick={handleClickOpen} color="primary">*/}
            {/*    유저 검색*/}
            {/*</Button>*/}
            <table aria-labelledby="form-dialog-title">


                <thead>
                <tr>
                    <th scope="col">사용자 이름</th>
                    <th scope="col">변경</th>
                    <th scope="col">삭제</th>


                </tr>
                </thead>
                <tbody>

                {result &&
                result.map((content) => (


                    <tr style={{marginBottom: 20}}>
                        <td>{content.username}</td>
                        <td><FormDialog id={content._id} username={content.username}/></td>
                        <td><UserDeleteButton post_id={content._id}/></td>

                    </tr>


                ))}


                </tbody>


            </table>
        </>
    );
}
