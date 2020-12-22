import gql from 'graphql-tag'; //gql은 자바스크립트로 스키마를 정의함 이것도 spring model 같음..? 거의 컨트롤러 같은 느낌
const typeDefs = gql`
    type Query {
        contents(search:String, category:Int, index:Int, hasNext:Boolean): [Content]!
        maxIndex : Int!
        user(id: ID!): User
        allUsers: [User!]!
        me: User
    }
    type User {
        id: ID!
        username: String
        email: String!
      }
    type AuthPayload {
        token: String
        user: User
    }
    type Content {
        _id: ID!
        title: String!
        content: String!
        createdAt: String!
    }
    input ContentInput{
        title: String!
        content: String!
    }
    type Mutation{
        createContent(contentInput: ContentInput): Content!
        updateContent(_id: ID!, title:String, content:String): Content!
        removeContent(_id: ID!): Content!
        searchByID(_id: ID!) : Content!
        registerUser(username: String, email: String!, password: String!): AuthPayload
        login (email: String!, password: String!): AuthPayload!
        logout:Boolean!
    }
`;
// input 타입은 인자가 적으면 그냥 넣어주면 되지만 만약에 인자 값이 10개가 넘어간다고 했을 때 한번에 넣을 수 있는 객체이다.
// mutation은 리소스를 변경할 때 만들어주는 것이고 아마 CRUD 구성하는 모든 함수가 여기 들어가지 않을까 싶다.
export default typeDefs;