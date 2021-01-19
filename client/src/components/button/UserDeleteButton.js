import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {multipleDelete} from "../../graphql/mutation";
import {MeQuery, OrderSearch, Receipt, UserSearchQuery} from "../../graphql/query";


function DeleteButton(post_id) {

    const [deletePostOrMutation, {loading}] = useMutation(multipleDelete, {
        refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
            , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}},
            {query: Receipt}],
            variables: {ids: [String(Object.values(post_id))]},
            onCompleted: () => {
                alert("유저 삭제가 완료되었습니다.")
            },
            onError: () => {
                alert("다시 시도해주세요!")
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
