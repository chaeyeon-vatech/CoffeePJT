import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {BackUserMutation, TaskRemoveMutation} from "../../graphql/mutation";
import {VacationQuery} from "../../graphql/query";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    addButton: {
        width: "100%",
        color: "#151414",
        display: "block",
        margin: "10px 10px",
    },
}));


function TaskDeleteButton(post_id) {

    const user = localStorage.getItem('myData');


    const theme = useTheme();
    const classes = useStyles({theme});
    const mutation = BackUserMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: VacationQuery}],
            variables: {id: String(Object.values(post_id))},
            onCompleted: (data) => {
                alert("주문자로 전환되었습니다!");


            }
        }
    )

    return (
        <>

            <form action="#">
                <Row
                    horizontal='center'
                    vertical='center'
                    className={[classes.addButton].join(' ')}
                    onClick={deletePostOrMutation}
                >
                    Click! </Row>

            </form>

        </>
    );
}


export default TaskDeleteButton;

