import gql from 'graphql-tag';


//Pagination할 전체 목록
export const IndexQuery = gql`
    query orders($index:Int!){
        orders(search:"",category:1,index:$index,hasNext:true){
            _id
            menu
            hi
            username
            createdAt
        }
    }
`;

//User Order 목록 불러오기/검색
export const UserSearchQuery = gql`
    query {
        allUsers{
            _id, position,username, status
        }
    }
`;


//내 목록 불러오기
export const MeQuery = gql`
    query me($userid:ID!) {
      me(userid:$userid){
          username
      }
    }

`


//명수 계산
export const CountQuery = gql`
    query howmany{
        howmany
    }

`

//누적 금액 계산
export const CostQuery = gql`
    query
    {
        howmuch
    }

`

//누적 잔 수
export const CupQuery = gql`
    query{coffeeAmount}`


//TASK QUERY


export const TaskQuery = gql`
    query{
        tasks{
            _id
            title
            creater
        }
    }


`

//Search

export const SearchQuery = gql`
    query($word: String!) {
        user(word:$word){
            _id
            username
            status
            position
        }
    }

`


//모든 유저 불러오기
export const AllUserQuery = gql`
    query{
        allUsers{
            _id
            username
            idNum
        }
    }
`

export const VacationQuery = gql`
    query{
        includedVacation{
            username
        }
    }

`








