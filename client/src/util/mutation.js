import gql from "graphql-tag";


export const CountMutation = gql`

    mutation howmany {
        howmany
    }
`;


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

export const LogoutMutation = gql`
    mutation logout{
        logout
    }
`