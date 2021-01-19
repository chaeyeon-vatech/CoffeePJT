import {useMutation} from "@apollo/react-hooks";
import {
    BackUserMutation,
    CreateUserMutation,
    getBackGiveup, multipleDelete, OrderBackMutation,
    OrderGiveupMutation,
    RemoveMutation,
    TaskRemoveMutation, UpdateUserMutation
} from "./mutation";
import {MeQuery, Ordermen, OrderSearch, Receipt, TaskQuery, UserSearchQuery, VacationQuery} from "./query";
import React from "react";

//주문 포기=> 재주문 상태로
export function ChangeGiveup(userid) {

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

    return giveup
}

//주문 삭제
export function DeleteOrder(userid) {


    const [deletePostOrMutation, {loading}] = useMutation(RemoveMutation, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}}],
            variables: {
                userid: userid.userid,
                orderid: userid.orderid
            },
            onError: () => {
                alert("다시 시도해주세요!")
            }
        }
    )
    return deletePostOrMutation;
}


//주문 포기
export function Giveup(userid) {

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

    return giveup;
}


//주문 재작성
export function TaskDelete(post_id, user_id) {

    const [deletemutation] = useMutation(TaskRemoveMutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {id: post_id.post_id, userid: post_id.user_id},
            onCompleted: () => {
                alert("주문이 취소되었습니다.");
            }
        }
    )
    return deletemutation;
}


//유저 생성

export function UserAdd(username, content, setOpen) {
    // const [open, setOpen] = React.useState(false);

    const [create] = useMutation(CreateUserMutation, {
            refetchQueries: [{query: UserSearchQuery}],
            variables: {
                username: content
            },
            onCompleted: () => {
                alert("유저 추가가 완료되었습니다.")
                setOpen(false);

            },
            onError: () => {
                alert("같은 이름은 등록하실 수 없습니다!")
            },
        }
    )

    return create
}

//유저 삭제

export function UserDelete(post_id) {

    const [deleteMutation, {loading}] = useMutation(multipleDelete, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}},
                {query: Receipt}],
            variables: {ids: [String(Object.values(post_id))]},
            onCompleted: () => {
                alert("유저 삭제가 완료되었습니다.")
            },
            onError: () => {
                alert("다시 시도해주세요!")
            }
        }
    )

    return deleteMutation;
}

//다수의 유저 삭제
export function MultipleUserDelete(checked) {
    const [mdelete] = useMutation(multipleDelete, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {
                alert("선택하신 유저가 삭제되었습니다.");
            },
            onError: () => {
                alert("다시 시도해주세요!")
            }
        }
    )

    return mdelete;
}

//유저 정보 업데이트
export function UpdateUser(checked,content,setOpen){
    const [update] = useMutation(UpdateUserMutation, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {
                id: checked.map((c) => (c._id)).toString(),
                username: content
            },
            onCompleted: () => {

                alert("정보 수정이 완료되었습니다.")
                setOpen(false);
            },
            onError: () => {
                alert("다시 시도해주세요!")
            }
        }
    )

    return update

}



//주문자 => 미주문자로
export function VacationBack(checked) {
    const [vacationback] = useMutation(BackUserMutation, {
            refetchQueries: [{query: Ordermen}, {query: VacationQuery}],
            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {
                alert("미주문자로 전환되었습니다!");

            }
        }
    )
    return vacationback;
}


//미주문자 => 주문자로
export function OrderBack(checked) {
    const [orderback] = useMutation(OrderBackMutation, {
            refetchQueries: [{query: Ordermen}, {query: VacationQuery}],
            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {

                alert("주문자로 전환되었습니다!");

            }
        }
    )
    return orderback;
}


export default {
    ChangeGiveup, DeleteOrder, Giveup,
    TaskDelete,
    UserAdd, UserDelete, MultipleUserDelete,
    VacationBack, OrderBack
};