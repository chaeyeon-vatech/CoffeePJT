import React from 'react';
import {TaskDelete} from "../../graphql/useMutation";
import {Row} from "simple-flexbox";
import {createUseStyles, useTheme} from "react-jss";


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

    const theme = useTheme();
    const classes = useStyles({theme});


    return (
        <>

            <form action="#">
                <Row
                    horizontal='center'
                    vertical='center'
                    className={[classes.addButton].join(' ')}
                    onClick={TaskDelete(post_id, user_id)}
                >
                    삭제
                </Row>

            </form>

        </>
    );
}


export default TaskDeleteButton;
