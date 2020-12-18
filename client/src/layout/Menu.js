import React from 'react';
import {Link} from "react-router-dom";

const Menu = (props) => (
    <ul className="menu">
        <li>
            <Link to="/" className={'tab_day on'}> 주문자 페이지 </Link>
        </li>
        <li>
            <Link to="/pay" className={'tab_day on'}> 결제자 페이지 </Link>
        </li>

        <li>
            <Link to="/login" className={'tab_day on'}>로그인/회원가입</Link>
        </li>
    </ul>
)

export default Menu;




