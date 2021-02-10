import React from "react";
import {CreateMutation} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {CostQuery, CountQuery, MeQuery, NotQuery, OrderSearch, Receipt, ReceiptUser} from "../../graphql/query";
import Button from "@material-ui/core/Button";
import {useSnackbar} from "notistack";

export function CreateOrder(hi) {

    const createmutation = CreateMutation;
    const {enqueueSnackbar} = useSnackbar();

    const [create] = useMutation(createmutation, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}},
                {query: Receipt}, {query: ReceiptUser, variables: {menu: 1}}, {
                    query: ReceiptUser,
                    variables: {menu: 3}
                }, {query: CostQuery}, {query: CountQuery}, {query: NotQuery}],
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