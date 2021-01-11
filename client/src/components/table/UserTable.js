import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {MeQuery, OrderSearch, UserSearchQuery} from "../../graphql/query";
import DeleteButton from "../button/DeleteButton";
import Button from "@material-ui/core/Button";


function BoardTable() {

    const [contents, setContents] = useState('');
    const [id, setId] = useState();


    const {data} = useQuery(OrderSearch, {
        variables: {
            id: localStorage.getItem('myData')

        }
    });

    useEffect(() => {
        if (data) {
            setContents(data.orderMine);
        }
    }, [data]);

    console.log(contents, "Id", id)


    return (
        <>

            <table>
                <caption>User 관리</caption>
                <thead>
                <tr>
                    <th scope="col">사용자 이름</th>
                    <th scope="col">메뉴</th>
                    <th scope="col">Hot/Ice</th>

                </tr>
                </thead>
                <tbody>
                {contents &&
                contents.map((content) => (
                    <tr key={content._id} style={{marginBottom: 20}}>
                        <td>{content.username}</td>
                        <td>{content.menu}</td>
                        <td>{content.hi}</td>
                    </tr>


                ))}


                </tbody>


            </table>

            {contents &&
            contents.map((content) => (
                <DeleteButton userid={localStorage.getItem("myData")} orderid={content._id}/>

            ))}


        </>


    )
}

export default BoardTable;
