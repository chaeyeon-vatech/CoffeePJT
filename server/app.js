import typeDefs from './graphql/schema/index.js';
import resolvers from './graphql/resolvers/index.js';

import dotenv from 'dotenv';

import {ApolloServer} from 'apollo-server';
import jwt from 'jsonwebtoken';


dotenv.config(); // 환경 변수를 찾아와 사용할 수 있게 해줌

import dbConnect from './models/index.js';

dbConnect();
const getUser = token => {
    try {
        if (token) {
            return jwt.verify(token, "somereallylongsecret")
        }
        return null
    } catch (error) {
        return null
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        const token = req.get('Authorization') || ''
        return {user: getUser(token.replace('Bearer', ''))}
    },
    introspection: true,
    playground: true
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});

