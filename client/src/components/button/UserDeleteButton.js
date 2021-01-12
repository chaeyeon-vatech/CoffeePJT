import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {RemoveMutation, UserDeleteMutation} from "../../graphql/mutation";
import {MeQuery,UserSearchQuery} from "../../graphql/query";


function DeleteButton(post_id) {


    const mutation = UserDeleteMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {id: String(Object.values(post_id))},
            onCompleted: (data) => {
                alert("유저 삭제가 완료되었습니다.")
                // window.location.href = '/order';
            }
        }
    )

    return (
        <>

            <form action="#">

                <TextField type='submit'
                           onClick={deletePostOrMutation}
                           disabled={loading}
                           value="🗑"/>

            </form>

        </>
    );
}


export default DeleteButton;
