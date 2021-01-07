import React, {useEffect, useState} from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {useHistory} from 'react-router-dom';
import SLUGS from 'resources/links';
import {convertlinksToUrl} from 'resources/utilities';
import LogoComponent from './LogoComponent';
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import {useAuthToken} from '../../routes/firstpage/authToken';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import {MeQuery} from "../../graphql/query";
import {Row} from "simple-flexbox";
import {LogoutMutation} from "../../graphql/mutation";

const useStyles = createUseStyles({
    separator: {
        borderTop: ({theme}) => `1px solid ${theme.color.lightGrayishBlue}`,
        marginTop: 16,
        marginBottom: 16,
        opacity: 0.06
    }
});

const handleClick = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {

        localStorage.clear()
        window.location.href = '/'
    }
}


function SidebarComponent() {
    const [_, removeAuthToken] = useAuthToken();

    const {push} = useHistory();
    const theme = useTheme();
    const classes = useStyles({theme});
    const isMobile = window.innerWidth <= 1080;

    const [user, setUser] = useState();


    const {data} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        },

    });

    useEffect(() => {
        if (data) {
            setUser(data.me.position);

        }
    }, [data]);

    console.log(user)

    function onClick(slug, parameters = {}) {
        push(convertlinksToUrl(slug, parameters));
    }

    return (
        <Menu isMobile={isMobile}>
            <div style={{paddingTop: 30, paddingBottom: 30}}>
                <LogoComponent/>
            </div>

            {user == "주문자" && <MenuItem
                id={SLUGS.orderboard}
                title='주문자 페이지'
                onClick={() => onClick(SLUGS.orderboard)}
            />}


            {user == "결제자" && <MenuItem
                id={SLUGS.tickets}
                title='결제자 페이지'
                onClick={() => onClick(SLUGS.tickets)}
            />}


            {user == "결제자" && <MenuItem
                id={SLUGS.create}
                title='주문 관리'
                onClick={() => onClick(SLUGS.create)}
            />}
            {user == "결제자" &&
            <MenuItem
                id={SLUGS.settings}
                title='유저 관리'
                onClick={() => onClick(SLUGS.settings)}
            />}

            {/*{!data && <MenuItem id='login' title='로그인'   onClick={() => onClick(SLUGS.login)}/>}*/}
            <div className={classes.separator}></div>
            {localStorage.getItem('myData') && <MenuItem id='logout' title='로그아웃' onClick={handleClick}/>}

        </Menu>
    );
}

export default SidebarComponent;




