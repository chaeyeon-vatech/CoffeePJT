import gql from 'graphql-tag'; //gql은 자바스크립트로 스키마를 정의함 이것도 spring model 같음..? 거의 컨트롤러 같은 느낌
const typeDefs = gql`
    type Query {
        orders(search:String, category:Int, index:Int, hasNext:Boolean, acdc: String): [Order]!
        user(_id: ID!): User
        allUsers: [User!]!
        me: User
    }
    type User {
        _id: ID
        username: String
        idNum: String!
    }
    type AuthPayload {
        token: String
        user: User
    }
    type Order {
        _id: ID
        menu: String!
        hi : String!
        username: String!
        createdAt: String
    }
    input OrderInput{
        menu: String!
        hi: String!
        username: String!
    }
    type Mutation{
        createOrder(orderInput: OrderInput): Order!
        updateOrder(_id: ID!, menu:String, hi:String): Order!
        removeOrder(_id: ID!): Order!
        searchByID(_id: ID!) : Order!
        registerUser(username: String, idNum: String!, password: String!): AuthPayload
        login (idNum: String!, password: String!): AuthPayload!
        logout:Boolean!
    }
`;
// input 타입은 인자가 적으면 그냥 넣어주면 되지만 만약에 인자 값이 10개가 넘어간다고 했을 때 한번에 넣을 수 있는 객체이다.
// mutation은 리소스를 변경할 때 만들어주는 것이고 아마 CRUD 구성하는 모든 함수가 여기 들어가지 않을까 싶다.
export default typeDefs;