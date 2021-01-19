import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {OrderGiveupMutation, RemoveMutation} from "../../graphql/mutation";
import {MeQuery, OrderSearch, UserSearchQuery} from "../../graphql/query";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {convertlinksToUrl} from "../../resources/utilities";


const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginTop: "30px",
        marginLeft: "20px"

    }

}));


function DeleteButton(userid) {

    const classes = useStyles();
    const mutation = RemoveMutation;
    const {push} = useHistory();


    function onClick(slug, parameters = {}) {
        push(convertlinksToUrl(slug, parameters));
    }

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}}],
            variables: {
                userid: userid.userid,
                orderid: userid.orderid
            },
            onError: () => {
                alert("다시 시도해주세요!")
            }
        }
    )


    return (
        <>

            <form action="#">

                <Button variant="contained" type='submit'

                        onClick={deletePostOrMutation}
                        disabled={loading}
                        className={classes.button}
                        value="↳주문 취소">
                    주문 취소
                </Button>

            </form>

        </>
    );
}


export default DeleteButton;
