import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import TextField from "@material-ui/core/TextField";
import {getBackGiveup, OrderGiveupMutation, RemoveMutation} from "../../graphql/mutation";
import {MeQuery, OrderSearch, UserSearchQuery} from "../../graphql/query";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        selfAlign: "center",
        marginTop: "30px",
        padding: "30px 80px 30px 80px",
        textAlign: "center"

    }

}));


function ChangeGiveupButton(userid) {

    const classes = useStyles();

    const [giveup] = useMutation(getBackGiveup, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}}], variables: {
                id: userid.userid
            },
            onCompleted: (data) => {
                window.location.href = '/order';
            }
        }
    )

    console.log(userid.userid)

    return (
        <>

            <form action="#">

                <Button variant="contained" type='submit'
                        onClick={giveup}
                        className={classes.button}
                        value="↳주문 취소">
                    주문을 포기하셨습니다.<br/>재주문하시려면 클릭해주세요.
                </Button>

            </form>

        </>
    );
}


export default ChangeGiveupButton;
