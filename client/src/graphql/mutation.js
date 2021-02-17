import gql from "graphql-tag";


//Order RewritePage

export const ORDER_CREATE_MUTATION = gql`
    mutation createOrder($id:String! $menu:String! $hi:String!){
        createOrder(_id:$id,menu:$menu, hi:$hi){
            menu
            hi
            username
        }
    }

`

export const ORDER_REMOVE_MUTATION = gql`
    mutation removeOrder($userid:String! $orderid:String!){
        removeOrder(userid:$userid, orderid:$orderid)
        {
            menu
            hi
            username
        }
    }
`

//Task RewritePage
export const TASK_CREATE_MUTATION = gql`
    mutation($userid:String!, $title:String!){
        createTask(userid:$userid, title:$title){
            _id
            creater
            title
        }
    }

`


export const TASK_UPDATE_MUTATION = gql`
    mutation updateTask($id:String! $title:String!){
        updateTask(_id:$id, title:$title){
            _id
            creater
            title
        }
    }

`

//Task Update

export const USER_UPDATE_MUTATION = gql`
    mutation updateUser($id:String! $username:String!){
        updateUser(_id:$id, username:$username){
            _id
            username
        }
    }

`

//Task Remove
export const TASK_REMOVE_MUTATION = gql`
    mutation removeTask($id:String!,$userid:ID!){
        removeTask(_id:$id,userid:$userid){
            _id
            creater
            title
        }
    }`


//주문 포기 상태로 전환
export const ORDER_GIVEUP_MUTATION = gql`
    mutation giveupOrder($userid:String!){
        giveupOrder(userid:$userid)
    }`

//주문 초기화
export const ORDER_CONFIRM_MUTATION = gql`
    mutation {
        confirmOrders
    }
`

export const POSITION_UPDATE_MUTATION = gql`
    mutation updatePosition($ids:[String])

    {updatePosition(ids:$ids)}

`


export const USER_REGISTER_MUTATION = gql`
    mutation registerUser($username: String!){
        registerUser(username:$username){
            username
        }
    }


`
export const USER_GETBACK_MUTATION = gql`
    mutation getbackUser($ids:[String])

    {getbackUser(ids:$ids)}

`

export const STATUS_GETBACK_MUTATION = gql`
    mutation getbackStatus($id:String!){
        getbackStatus(_id:$id)
    }
`

export const MULUSER_DELETE_MUTATION = gql`
    mutation deleteUser($ids:[String]!){
        deleteUser(ids:$ids)
    }
`