import {useMutation} from "@apollo/react-hooks";
import {
    POSITION_UPDATE_MUTATION, ORDER_CREATE_MUTATION,
    USER_REGISTER_MUTATION,
    STATUS_GETBACK_MUTATION, MULUSER_DELETE_MUTATION, USER_GETBACK_MUTATION,
    ORDER_GIVEUP_MUTATION,
    ORDER_REMOVE_MUTATION, TASK_CREATE_MUTATION,
    TASK_REMOVE_MUTATION, TASK_UPDATE_MUTATION, USER_UPDATE_MUTATION
} from "./mutation";
import {
    COST_QUERY,
    COUNT_QUERY,
    ME_QUERY, NOT_QUERY,
    ORDERMAN_QUERY,
    MY_ORDER_QUERY,
    RECEIPT_QUERY,
    TASK_QUERY,
    USER_SEARCH_QUERY,
    VACATION_QUERY
} from "./query";
import {useSnackbar} from "notistack";


//주문 포기=> 재주문 상태로
export function ChangeGiveup(userid) {
    const {enqueueSnackbar} = useSnackbar();

    const [giveup] = useMutation(STATUS_GETBACK_MUTATION, {
            refetchQueries: [{query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COUNT_QUERY}, {query: COST_QUERY}, {query: NOT_QUERY}],
            variables: {
                id: userid.userid
            },
            onCompleted: () => {

                enqueueSnackbar("주문을 포기하셨습니다.")
                window.location.href = '/order';
            }
        }
    )

    return giveup
}


//주문 생성

export function CreateOrder(hi) {
    const createmutation = ORDER_CREATE_MUTATION;
    const {enqueueSnackbar} = useSnackbar();


    const [create] = useMutation(createmutation, {
            refetchQueries: [{query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COUNT_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}],
            variables: {
                id: localStorage.getItem('myData'),
                menu: hi.menu,
                hi: hi.hi
            },
            onCompleted: () => {
                enqueueSnackbar(localStorage.getItem('name') + "님" + hi.menu + "를 선택하셨습니다!")
            },
            onError: () => {
                alert("메뉴를 선택해주세요.")
            },
        }
    )

    return create;


}

//주문 삭제
export function DeleteOrder(userid) {
    const {enqueueSnackbar} = useSnackbar();


    const [deletePostOrMutation] = useMutation(ORDER_REMOVE_MUTATION, {
            refetchQueries: [
                {query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COUNT_QUERY}, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}],
            variables: {
                userid: userid.userid,
                orderid: userid.orderid
            },
            onCompleted: () => {
                enqueueSnackbar("주문을 삭제하셨습니다.")
            },
            onError: () => {
                console.log(userid)
                console.log(typeof (userid.userid))
                console.log(typeof (userid.orderid))
            }
        }
    )
    return deletePostOrMutation;
}


//주문 포기
export function Giveup(userid) {
    const {enqueueSnackbar} = useSnackbar();

    const [giveup] = useMutation(ORDER_GIVEUP_MUTATION, {
            refetchQueries: [{query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COUNT_QUERY}, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}],
            variables: {
                userid: userid.userid
            },
            onCompleted: () => {
                enqueueSnackbar("주문을 포기하셨습니다.")
            }
        }
    )

    return giveup;
}


//주문 생성

export function TaskCreate() {
    const {enqueueSnackbar} = useSnackbar();
    const [create] = useMutation(TASK_CREATE_MUTATION, {
            refetchQueries: [{query: TASK_QUERY}],
            variables: {
                title: localStorage.getItem('task'),
                userid: localStorage.getItem('myData')
            },
            onCompleted: () => {
                enqueueSnackbar(localStorage.getItem('name') + "님 환영합니다!")
            }
        }
    )
    return create
}


//주문 재작성
export function TaskDelete(post_id) {
    const {enqueueSnackbar} = useSnackbar();


    const [deletemutation] = useMutation(TASK_REMOVE_MUTATION, {
            refetchQueries: [{query: TASK_QUERY}, {query: RECEIPT_QUERY}],
            variables: {id: post_id.post_id, userid: post_id.user_id},
            onCompleted: () => {
                enqueueSnackbar("주문 재작성 페이지로 돌아갑니다!");
            }
        }
    )
    return deletemutation;
}

export function TaskUpdate(id, content, setOpen) {
    const {enqueueSnackbar} = useSnackbar();


    const [update] = useMutation(TASK_UPDATE_MUTATION, {
        refetchQueries: [{query: TASK_QUERY}, {query: RECEIPT_QUERY}],

        variables: {
            id: id.id,
            title: content
        },
        onCompleted: () => {
            enqueueSnackbar("주문 내용이 " + content + "으로 수정되었습니다.")
            setOpen(false);

        },
        onError: () => {
            enqueueSnackbar("다시 시도해주세요!")
        }
    })
    return update
}


//유저 생성

export function UserAdd(username, content, setOpen) {
    const {enqueueSnackbar} = useSnackbar();


    const [create] = useMutation(USER_REGISTER_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY}, {query: RECEIPT_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}, {query: USER_SEARCH_QUERY}],
            awaitRefetchQueries: true,
            variables: {
                username: content
            },
            onCompleted: () => {
                enqueueSnackbar("유저 추가가 완료되었습니다.")
                setOpen(false);

            },
            onError: () => {
                enqueueSnackbar("같은 이름은 등록하실 수 없습니다!")
            },
        }
    )

    return create
}

//유저 삭제

export function UserDelete(id) {
    const {enqueueSnackbar} = useSnackbar();


    const [deleteMutation] = useMutation(MULUSER_DELETE_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY},
                {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}, {query: USER_SEARCH_QUERY}],
            awaitRefetchQueries: true,
            variables: {ids: [String(Object.values(id))]},
            onCompleted: () => {
                enqueueSnackbar("유저 삭제가 완료되었습니다.")

            },
            onError: () => {
                enqueueSnackbar("다시 시도해주세요!")
            }
        }
    )

    return deleteMutation;
}

export function SearchDelete(id) {
    const {enqueueSnackbar} = useSnackbar();


    const [deleteMutation] = useMutation(MULUSER_DELETE_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY},
                {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}, {query: USER_SEARCH_QUERY}],
            awaitRefetchQueries: true,

            variables: {ids: [String(Object.values(id))]},
            onCompleted: () => {
                enqueueSnackbar("선택하신 유저가 삭제되었습니다.")
                window.location.href = '/settings';

            },
            onError: () => {
                enqueueSnackbar("다시 시도해주세요!")
            }
        }
    )

    return deleteMutation;
}

//다수의 유저 삭제
export function MultipleUserDelete(checked) {
    const {enqueueSnackbar} = useSnackbar();

    const [mdelete] = useMutation(MULUSER_DELETE_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY},
                {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COUNT_QUERY}, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}, {query: USER_SEARCH_QUERY}],
            awaitRefetchQueries: true,
            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {
                enqueueSnackbar("선택하신 유저가 삭제되었습니다.");
            },
            onError: () => {
                enqueueSnackbar("다시 시도해주세요!")
            }
        }
    )

    return mdelete;
}

//유저 정보 업데이트
export function UpdateUser(checked, content, setOpen) {
    const {enqueueSnackbar} = useSnackbar();

    const [update] = useMutation(USER_UPDATE_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY},
                {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}},
                {query: RECEIPT_QUERY}, {query: COST_QUERY}, {query: COUNT_QUERY}, {query: NOT_QUERY}],
            awaitRefetchQueries: true,
            variables: {
                id: checked.map((c) => (c._id)).toString(),
                username: content
            },
            onCompleted: () => {
                enqueueSnackbar("정보 수정이 완료되었습니다.")
                setOpen(false);
            },
            onError: () => {
                enqueueSnackbar("다시 시도해주세요!")
            }
        }
    )

    return update

}

//유저 정보 선택적 업데이트
export function SelectUpdate(username, content, setClick) {

    const mutation = USER_UPDATE_MUTATION;
    const {enqueueSnackbar} = useSnackbar();


    const [update] = useMutation(mutation, {
            refetchQueries: [{query: MY_ORDER_QUERY, variables: {id: localStorage.getItem('myData')}}
                , {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}}], variables: {
                id: username.id,
                username: content
            },
            awaitRefetchQueries: true,

            onCompleted: () => {

                enqueueSnackbar("정보 수정이 완료되었습니다.")
                setClick(false)

            }
        }
    )
    return update
}


//선택적 수정

export function DUpdateUser(username, content, setOpen) {
    const {enqueueSnackbar} = useSnackbar();

    const [update] = useMutation(USER_UPDATE_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY},
                {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}}],
            awaitRefetchQueries: true,

            variables: {
                id: username.id,
                username: content
            },
            onCompleted: () => {
                enqueueSnackbar("정보 수정이 완료되었습니다.")
                setOpen(false);
            },
            onError: () => {
                enqueueSnackbar("다시 시도해주세요!")
            }
        }
    )

    return update
}

export function DSelectUser(username, setOpen) {
    const {enqueueSnackbar} = useSnackbar();

    const [update] = useMutation(MULUSER_DELETE_MUTATION, {
            refetchQueries: [{query: USER_SEARCH_QUERY},
                {query: ME_QUERY, variables: {userid: localStorage.getItem('myData')}}],
            variables: {
                ids: [username.id]
            },
            awaitRefetchQueries: true,

            onCompleted: () => {
                setOpen(false);
                window.location.href = '/settings';

            },
            onError: () => {
                enqueueSnackbar("다시 시도해주세요!")
            }
        }
    )

    return update
}


//주문자 => 미주문자로
export function VacationBack(checked, setChecked) {
    const {enqueueSnackbar} = useSnackbar();
    const [vacationback] = useMutation(POSITION_UPDATE_MUTATION, {
            refetchQueries: [{query: ORDERMAN_QUERY}, {query: VACATION_QUERY}],
            variables: {ids: checked.map((c) => (c._id))},
            awaitRefetchQueries: true,

            onCompleted: () => {
                setChecked([]);
                enqueueSnackbar(checked.map((c) => (c.username)) + ": 미주문자로 전환되었습니다!");

            }
        }
    )
    return vacationback;
}


//미주문자 => 주문자로
export function OrderBack(checked, setChecked) {
    const {enqueueSnackbar} = useSnackbar();


    const [orderback] = useMutation(USER_GETBACK_MUTATION, {
            refetchQueries: [{query: ORDERMAN_QUERY}, {query: VACATION_QUERY}],
            awaitRefetchQueries: true,

            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {
                setChecked([]);
                enqueueSnackbar(checked.map((c) => (c.username)) + ": 주문자로 전환되었습니다!");

            }
        }
    )
    return orderback;
}


export default {
    ChangeGiveup, DeleteOrder, Giveup,
    TaskDelete, TaskUpdate, TaskCreate,
    UserAdd, UserDelete, SearchDelete, MultipleUserDelete, UpdateUser, SelectUpdate, DSelectUser,
    VacationBack, OrderBack
};