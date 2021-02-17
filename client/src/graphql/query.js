import gql from 'graphql-tag';

//User Order 목록 불러오기/검색
export const USER_SEARCH_QUERY = gql`
    query {
        allUsers{
            _id, position,username, status
        }
    }
`;


//내 목록 불러오기
export const ME_QUERY = gql`
    query me($userid:String!) {
        me(userid:$userid){
            username
            position
            status
            _id
        }
    }

`


//명수 계산
export const COUNT_QUERY = gql`
    query howmany{
        howmany
    }

`

//누적 금액 계산
export const COST_QUERY = gql`
    query
    {
        howmuch
    }

`

//TASK QUERY


export const TASK_QUERY = gql`
    query{
        tasks{
            _id
            title
            creater
        }
    }


`

//Search

export const SEARCH_QUERY = gql`
    query($word: String!) {
        user(word:$word category:1){
            _id
            username
            status
            position
        }
    }

`

export const VACATION_QUERY = gql`
    query{
        includedVacation{
            username
            _id
        }
    }

`

export const NOT_QUERY = gql`
    query {
        includedNothing{
            username
        }
    }


`

export const ORDERMAN_QUERY = gql`
    query{
        includedOrdermen{
            username
            _id
        }
    }`


export const MY_ORDER_QUERY = gql`
    query orderMine($id:String!){
        orderMine(_id:$id){
            _id
            username
            hi
            menu
        }
    }
`

export const RECEIPT_QUERY = gql`
    query {receipt}
`

export const USER_RECEIPT_QUERY = gql`
    query receiptUser($menu:Int!)
    {receiptUser(cmenu:$menu)}
`




