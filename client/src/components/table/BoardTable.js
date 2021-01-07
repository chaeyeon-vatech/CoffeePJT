import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery, IndexQuery, MeQuery, UserSearchQuery} from "../../graphql/query";


function BoardTable() {


    const [length, setLength] = useState();

    const {data: user} = useQuery(UserSearchQuery)


    useEffect(() => {
        if (user) {
            setLength(user.allUsers);

        }
    }, [user]);



    return (


        <table>
            <caption>주문 내역</caption>

            <thead>
            <tr>
                <th scope="col">사용자 이름</th>
                <th scope="col">상태</th>


            </tr>
            </thead>
            <tbody>

            {length &&
            length.map((content) => (


                <tr style={{marginBottom: 20}}>
                    <td>{content.username}</td>
                    <td>{content.position}</td>


                </tr>


            ))}


            </tbody>


        </table>

    )
}

export default BoardTable;
