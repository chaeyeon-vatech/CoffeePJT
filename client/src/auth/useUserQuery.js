import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const userQueryGQL = gql`
    query user {
        allUsers {
            _id
            username
            idNum
        }
    }
`;

export const useUserQuery = () => useQuery(userQueryGQL);