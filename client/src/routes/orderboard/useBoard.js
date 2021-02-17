import React from "react";
import {ORDER_CREATE_MUTATION} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {COST_QUERY, COUNT_QUERY, ME_QUERY, NOT_QUERY, MY_ORDER_QUERY, RECEIPT_QUERY, USER_RECEIPT_QUERY} from "../../graphql/query";
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";

export function CreateOrder(hi) {

    const createmutation = ORDER_CREATE_MUTATION;
    const {enqueueSnackbar} = useSnackbar();

    const [create] = useMutation(createmutation, {
            refetchQueries: [{query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: USER_RECEIPT_QUERY, variables: {menu: 1}}, {
                    query: USER_RECEIPT_QUERY,
                    variables: {menu: 3}
                }, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}],
            variables: {
                id: localStorage.getItem('myData'),
                menu: hi.menu,
                hi: hi.hi
            },
            onCompleted: () => {
                enqueueSnackbar("주문이 완료되었습니다!")
            },
            onError: () => {
                alert("메뉴를 선택해주세요.")
            },
        }
    )

    return (
        <>
            <Button
                type='submit'
                color={hi.color}
                onClick={create}>
                {hi.label}
            </Button>
        </>


    )
}

export default CreateOrder;