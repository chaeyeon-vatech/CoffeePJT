import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {TaskRemoveMutation} from "../../util/mutation";
import {TaskQuery} from "../../util/query";


function TaskDeleteButton(post_id) {


    const mutation = TaskRemoveMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {id: String(Object.values(post_id))},
            onCompleted: (data) => {
                window.location.href = '/order';


            }
        }
    )

    return (
        <>

            <form action="#">

                <TextField type='submit'
                           onClick={deletePostOrMutation}
                           disabled={loading}
                           value="X"/>

            </form>

        </>
    );
}


export default TaskDeleteButton;
