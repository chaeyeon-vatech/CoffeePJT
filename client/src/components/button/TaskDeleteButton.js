import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {TaskRemoveMutation} from "../../graphql/mutation";
import {TaskQuery} from "../../graphql/query";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";
import {useHistory} from "react-router-dom";
import {convertlinksToUrl} from "../../resources/utilities";
import SLUGS from 'resources/links';


const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: "black",
        fontSize: '14px !important',
        padding: '5px !important',
        marginLeft: "40px"
    },
}));


function TaskDeleteButton(post_id, user_id) {

    const user = localStorage.getItem('myData');
    const theme = useTheme();
    const classes = useStyles({theme});
    const mutation = TaskRemoveMutation;

    const [deletePostOrMutation, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {id: post_id.post_id, userid: post_id.user_id},
            onCompleted: (data) => {
                alert("주문이 취소되었습니다.");


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
                    삭제
                </Row>

            </form>

        </>
    );
}


export default TaskDeleteButton;
