import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {OrderGiveupMutation, RemoveMutation} from "../../graphql/mutation";
import {MeQuery, OrderSearch, UserSearchQuery} from "../../graphql/query";
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
    const [giveup] = useMutation(OrderGiveupMutation, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}}],
            variables: {
                userid: userid.userid
            },
            onCompleted: (data) => {
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
