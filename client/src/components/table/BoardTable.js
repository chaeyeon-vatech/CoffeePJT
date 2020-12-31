import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery, IndexQuery, MeQuery} from "../../graphql/query";


function BoardTable() {

    const [contents, setContents] = useState('');
    const [id, setId] = useState();
    const [length, setLength] = useState();
    const [index, setIndex] = useState(1);

    const pageNumbers = []


    const {data: da} = useQuery(MeQuery);

    useEffect(() => {
        if (da) {
            setId(da.me.idNum);
        }
    }, [da]);


    const {data} = useQuery(IndexQuery, {
        variables: {
            index: index
        }
    });


    useEffect(() => {
        if (data) {
            setContents(data.orders);
        }
    }, [data]);


    const {data: user} = useQuery(AllUserQuery)


    useEffect(() => {
        if (user) {
            setLength(user.allUsers.length);

        }
    }, [user]);


    for (let i = 1; i <= Math.ceil(length / 10); i++) {
        pageNumbers.push(i);
    }

    return (


        <table>
            <caption>주문자 현황</caption>

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

            <tr>
                <td></td>
                <td>
                    <nav className="o-nav o-nav--inline">
                        <ol>
                            {pageNumbers.map(number => (
                                <li key={number}>
                                    <a onClick={() => setIndex(number)}
                                       className='c-pagination-nav__link'>
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </td>

                <td></td>
            </tr>


            </tbody>


        </table>

    )
}

export default BoardTable;
