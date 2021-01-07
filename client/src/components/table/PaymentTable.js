import React, {useEffect, useState} from 'react';
import './table.css';
import {useQuery} from "@apollo/react-hooks";
import {CupQuery} from "../../graphql/query";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({



}))


function BoardTable() {


    return (


        <table>
            <thead>
            <tr>
                <th scope="col">주문자 이름</th>
                <th scope="col">선택</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="col">아메리카노</th>
                <th scope="col"><a type="submit">선택</a></th>
            </tr>
            </tbody>
        </table>

    )
}

export default BoardTable;
