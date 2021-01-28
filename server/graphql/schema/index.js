import gql from 'graphql-tag'; //gql은 자바스크립트로 스키마를 정의함 이것도 spring model 같음..? 거의 컨트롤러 같은 느낌
const typeDefs = gql`
    type Query {
        orders(hi:String): [Order]!
        tasks:[Task]
        orderMine(_id:String!):[Order!]
        user(word:String, category:Int!):[User!]
        allUsers: [User!]!
        me(userid: String!):User!
        howmany:[Int!]
        howmuch:Int!
        coffeeAmount:[Int!]
        includedCoffee(menu:String!, hi:String!):[Order!]
        includedOrdermen:[User!]
        includedVacation:[User!]
        includedNothing:[User!]
        receipt:[String]
        receiptUsers:[String!]
        receiptUser(cmenu:Int!):String!
    }
    type User {
        _id: String
        username: String
        status: String
        position : String
    }
    type Order {
        _id: String
        menu: String
        hi : String
        username: String
    }
    type Task{
        _id: String
        creater:String
        title: String
    }

    type Mutation{
        createOrder(_id:String!, menu:String!, hi:String): Order!
        updateOrder(userid: String!, orderid: String!, menu:String, hi:String): Order!
        removeOrder(userid: String!, orderid: String!): Order!
        giveupOrder(userid: String!): String!
        confirmOrders:String!


        createTask(userid: String!, title:String!): Task!
        updateTask(_id:String!, title:String):Task!
        removeTask(_id: String!, userid:String!): Task!

        registerUser(username:String!):User!
        updatePosition(ids:[String]):String!
        updateUser(_id:String!, username:String!):User!
        getbackUser(ids:[String]):String!
        getbackStatus(_id:String!):String!
        deleteUser(ids:[String]):String!
        mee(userid: String!):User!
    }
`;
// input 타입은 인자가 적으면 그냥 넣어주면 되지만 만약에 인자 값이 10개가 넘어간다고 했을 때 한번에 넣을 수 있는 객체이다.
// mutation은 리소스를 변경할 때 만들어주는 것이고 아마 CRUD 구성하는 모든 함수가 여기 들어가지 않을까 싶다.
export default typeDefs;