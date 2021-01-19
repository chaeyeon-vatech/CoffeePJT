import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {multipleDelete} from "../../graphql/mutation";
import {MeQuery, OrderSearch, Receipt, UserSearchQuery} from "../../graphql/query";
import {UserDelete} from "../../graphql/useMutation";


function DeleteButton(post_id) {

    return (
        <>

            <form action="#">

                <TextField type='submit'
                           onClick={UserDelete(post_id)}
                           value="🗑"/>

            </form>

        </>
    );
}


export default DeleteButton;
