import gql from "graphql-tag";


//Order Create

export const CreateMutation = gql`
    mutation createOrder($menu:String! $hi: String! $username: String!){
        createOrder(orderInput:{
            menu:$menu,
            hi:$hi,
            username:$username
        }){
            _id
            menu
            hi
            username
            createdAt
        }
    }
`

export const RemoveMutation = gql`
    mutation removeOrder($id:ID!){
        removeOrder(_id:$id){
            _id
            menu
            hi
            username
            createdAt
        }
    }`


//로그아웃
export const LogoutMutation = gql`
    mutation logout{
        logout
    }
`

//Task Create
export const TaskCreateMutation = gql`
    mutation {
        createTask(userid:$userid, title:$title){
            _id
            creater
            title
        }
    }
`

//Task Update

export const TaskUpdateMutation = gql`
    mutation updateTask($id:ID!, $title:String!){
        updateTask(_id:$id,title:$title){
            _id
            title
        }
    }

`

//Task Remove
export const TaskRemoveMutation = gql`
    mutation removeTask($id:ID!,$userid:ID!){
        removeTask(_id:$id,userid:$userid){
            _id
            creater
            title
        }
    }`


//주문 포기 상태로 전환
export const OrderGiveupMutation = gql`
    mutation {
        giveupOrder
    }`

//주문 초기화
export const OrderConfirmMutation = gql`
    mutation confirmOrders($creater:String!) {
        confirmOrders(creater:$creater)
    }
`