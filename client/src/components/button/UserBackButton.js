import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {BackUserMutation} from "../../graphql/mutation";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";
import {Ordermen, VacationQuery} from "../../graphql/query";


const useStyles = createUseStyles((theme) => ({
    addButton: {
        width: "100%",
        color: "#151414",
        display: "block",
        margin: "10px 10px",
    },
}));


function TaskDeleteButton(user) {

    const theme = useTheme();
    const classes = useStyles({theme});
    const mutation = BackUserMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: Ordermen, VacationQuery}],
            variables: {ids: user},
            onCompleted: (data) => {
                alert("휴가자로 전환되었습니다!");

                window.location.href = '/create';


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

