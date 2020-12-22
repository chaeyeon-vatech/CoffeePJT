import gql from 'graphql-tag';

export const OrderQuery = gql`
    query orders(search:String!, category:Int!, index:Int!, hasNext:Boolean!){
        orders(search:"",category:0,index:1,hasNext:false){
            _id
            menu
            hi
            username
            createdAt
        }
    }

`;

// export const SearchQuery = gql`
//     query contents($search:String!,$category:Int!,$index:Int!, $hasNext:Boolean!){
//         contents(search:$search,category:$category,index:$index,hasNext:$hasNext){
//             _id
//             title
//             content
//             createdAt
//         }
//     }
// `;
//
// export const PageQuery = gql`
//     query {
//         maxIndex
//     }
// `;
