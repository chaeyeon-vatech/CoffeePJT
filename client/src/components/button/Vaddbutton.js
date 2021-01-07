import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {TaskRemoveMutation, UpdateMutation} from "../../graphql/mutation";
import {TaskQuery, VacationQuery} from "../../graphql/query";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    addButton: {
        width: "100%",
        color: "#fff",
        display: "block",
        margin: "10px 10px"
    },
}));


function TaskDeleteButton(post_id) {

    const user = localStorage.getItem('myData');


    const theme = useTheme();
    const classes = useStyles({theme});
    const mutation = UpdateMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: VacationQuery}],
            variables: {id: String(Object.values(post_id))}
        }
    )

    return (
        <>


                <a type="submit" className={[classes.addButton].join(' ')}
                   onClick={deletePostOrMutation}>

                    선택
                </a>



        </>
    );
}


export default TaskDeleteButton;

