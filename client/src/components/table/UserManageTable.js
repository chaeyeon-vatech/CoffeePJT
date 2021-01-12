import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery, IndexQuery, MeQuery, UserSearchQuery} from "../../graphql/query";
import UserDeleteButton from "../button/UserDeleteButton";
import {Column} from "simple-flexbox";
import UpdateButton from "../button/UpdateButton";


function UserManageTable() {


    const [length, setLength] = useState();
    const [click, setClick] = useState(false);

    const {data: user} = useQuery(UserSearchQuery)


    useEffect(() => {
        if (user) {
            setLength(user.allUsers);

        }
    }, [user]);


    return (


        <table>
            <caption>유저 추가/삭제</caption>

            <thead>
            <tr>
                <th scope="col">사용자 이름</th>
                <th scope="col">변경</th>
                <th scope="col">삭제</th>


            </tr>
            </thead>
            <tbody>

            {length &&
            length.map((content) => (


                <tr style={{marginBottom: 20}}>
                    <td>{content.username}</td>
                    <td><UpdateButton id={content._id} username={content.username}/></td>
                    <td><UserDeleteButton post_id={content._id}/></td>


                </tr>


            ))}


            </tbody>


        </table>

    )
}

export default UserManageTable;
