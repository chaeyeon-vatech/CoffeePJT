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
// export const CREATEMUTATION = gql`
//     mutation createContent($title:String! $content:String!){
//         createContent(contentInput:{
//             title:$title,
//             content:$content
//         }){
//             _id
//             title
//             content
//             createdAt
//         }
//     }
// `;
//
// export const UPDATEMUTATION = gql`
//     mutation updateContent($id:ID! $title:String! $content:String! ){
//         updateContent(
//             _id:$id,
//             title:$title,
//             content:$content
//         ){
//             _id
//             title
//             content
//             createdAt
//         }
//     }
//
// `;
