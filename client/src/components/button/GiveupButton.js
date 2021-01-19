import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {OrderGiveupMutation, RemoveMutation} from "../../graphql/mutation";
import {MeQuery, UserSearchQuery} from "../../graphql/query";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginTop: "30px",
        marginLeft: "450px",
        padding: "10px 40px 10px 40px",
        textAlign: "center"

    }

}));


function GiveupButton(userid) {

    const classes = useStyles();
    const mutation = RemoveMutation;

    const [giveup] = useMutation(OrderGiveupMutation, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {
                userid: userid.userid
            },
            onCompleted: (data) => {
                alert("주문을 포기하셨습니다.")
                window.location.href = '/order';
            }
        }
    )


    return (
        <>

            <form action="#">

                <Button variant="contained" type='submit'
                        onClick={giveup}
                        className={classes.button}
                        value="↳주문 취소">
                    주문하지 않겠습니다.
                </Button>

            </form>

        </>
    );
}


export default GiveupButton;
