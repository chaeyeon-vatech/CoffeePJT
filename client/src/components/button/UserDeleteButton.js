import React from 'react';
import {UserDelete} from "../../graphql/useMutation";
import Button from "@material-ui/core/Button";


function DeleteButton(id) {

    return (
        <>

            <form action="#">
                <Button
                    onClick={UserDelete(id)}>🗑</Button>
            </form>

        </>
    );
}


export default DeleteButton;
