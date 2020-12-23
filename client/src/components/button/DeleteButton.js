import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {RemoveMutation} from "../../util/mutation";
import {SearchQuery} from "../../util/graphql";


function DeleteButton(post_id) {


    const mutation = RemoveMutation;


    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: SearchQuery}],
            variables: {id: String(Object.values(post_id))}
        }
    )

    return (
        <>

            <form action="#">

                <TextField type='submit'
                           onClick={deletePostOrMutation}
                           disabled={loading}
                           value="↳주문 취소"/>

                {/*<button onClick="window.location.reload();">Refresh Page</button>*/}


            </form>

        </>
    );
}


export default DeleteButton;
