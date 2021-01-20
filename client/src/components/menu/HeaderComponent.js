import React, {useContext, useEffect, useState} from 'react';
import {string} from 'prop-types';
import {useHistory} from 'react-router-dom';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import {SidebarContext} from 'resources/hooks/useSidebar';
import SLUGS from 'resources/links';
import {useQuery} from "@apollo/react-hooks";
import {MeQuery} from "../../graphql/query";

const useStyles = createUseStyles((theme) => ({
    avatar: {
        height: 35,
        width: 35,
        minWidth: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        '@media (max-width: 768px)': {
            marginLeft: 14
        }
    },
    container: {
        height: 40
    },
    name: {
        ...theme.typography.itemTitle,
        textAlign: 'right',
        color: "white",
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    separator: {
        borderLeft: `1px solid ${theme.color.lightGrayishBlue2}`,
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 14,
            marginRight: 0
        }
    },
    title: {
        ...theme.typography.title,
        color: "white",
        '@media (max-width: 1080px)': {
            marginLeft: 50
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
}));

function HeaderComponent() {
    const {push} = useHistory();
    const {currentItem} = useContext(SidebarContext);
    const theme = useTheme();
    const classes = useStyles({theme});
    const [username, setName] = useState();

    const {data} = useQuery(MeQuery);

    useEffect(() => {
        if (data) {
            setName(data.me.username);
        }
    }, [data]);


    let title;
    switch (true) {
        case currentItem === SLUGS.orderboard:
            title = '주문자 페이지';
            break;

        case currentItem === SLUGS.pay:
            title = '결제자 페이지';
            break;


        case currentItem === SLUGS.create:
            title = '주문 관리 페이지';
            break;

        case currentItem === SLUGS.settings:
            title = '유저 관리 페이지';
            break;
        default:
            title = '';
    }


    return (
        <Row className={classes.container} vertical='center' horizontal='space-between'>
            <span className={classes.title}>{title}</span>
            <Row vertical='center'>
                <div className={classes.separator}></div>
            </Row>
        </Row>
    );
}

HeaderComponent.propTypes = {
    title: string
};

export default HeaderComponent;
