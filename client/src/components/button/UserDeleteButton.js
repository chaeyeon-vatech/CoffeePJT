import React from 'react';
import {UserDelete} from "../../graphql/useMutation";
import Button from "@material-ui/core/Button";


function DeleteButton(post_id) {

    return (
        <>

            <form action="#">

                <Button
                    onClick={UserDelete(post_id)}
                    value="🗑">🗑</Button>

            </form>

        </>
    );
}


export default DeleteButton;
