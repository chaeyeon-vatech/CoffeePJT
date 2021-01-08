import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {
    VacationQuery
} from "../../graphql/query";
import {createUseStyles} from "react-jss";
import UserBackButton from "../button/UserBackButton";


const useStyles = createUseStyles((theme) => ({
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    }

}));


function BoardTable() {


    const [length, setLength] = useState();

    const {data: user} = useQuery(VacationQuery)

    useEffect(() => {
        if (user) {
            setLength(user.includedVacation);

        }
    }, [user]);


    return (


        <table>
            <caption>휴가자</caption>

            <thead>
            <tr>
                <th scope="col">사용자 이름</th>
                <th scope="col">주문자로 전환</th>

            </tr>
            </thead>
            <tbody>

            {length &&
            length.map((content) => (


                <tr style={{marginBottom: 20}}>
                    <td>{content.username}</td>
                    <td><UserBackButton post_id={content._id}/></td>
                </tr>

            ))}


            </tbody>


        </table>

    )
}

export default BoardTable;
