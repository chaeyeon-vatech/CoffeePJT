import gql from "graphql-tag";


//Order Create

export const CreateMutation = gql`
    mutation createOrder($id:ID! $menu:String! $hi:String!){
        createOrder(_id:$id,menu:$menu, hi:$hi){
            menu
            hi
            username
        }
    }

`

export const RemoveMutation = gql`
    mutation removeOrder($userid:ID! $orderid:ID!){
        removeOrder(userid:$userid, orderid:$orderid)
        {
            menu
            hi
            username
        }
    }
`


//로그아웃
export const LogoutMutation = gql`
    mutation logout{
        logout
    }
`

//Task Create
export const TaskCreateMutation = gql`
    mutation($userid:ID!, $title:String!){
        createTask(userid:$userid, title:$title){
            _id
            creater
            title
        }
    }

`

//Task Update

export const UpdateMutation = gql`
    mutation($id:ID!){
        updatePosition(_id:$id){
            username
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
    mutation giveupOrder($userid:ID!){
        giveupOrder(userid:$userid)
    }`

//주문 초기화
export const OrderConfirmMutation = gql`
    mutation {
        confirmOrders
    }
`


export const MeMutation = gql`
    mutation($id:ID!){
        me(userid:$id){
            username
        }
    }
`


export const BackUserMutation = gql`
    mutation updatePosition($ids:[ID])
    
    {updatePosition(ids:$ids)}

`


export const CreateUserMutation = gql`
    mutation registerUser($username: String!){
        registerUser(username:$username){
            username
        }
    }


`


export const UserDeleteMutation = gql`
    mutation deleteUser($id: ID!){
        deleteUser(_id:$id){
            username
            position
        }
    }


`