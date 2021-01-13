import React from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {Column, Row} from 'simple-flexbox';
import {SidebarComponent, SidebarContext} from 'components/sidebar';
import HeaderComponent from 'components/header/HeaderComponent';
import PrivateRoutes from './PrivateRoutes';
import {Redirect, Route, Switch} from "react-router-dom";
import LINKS from "../resources/links";
import basicLogin from "./firstpage/LoginPage";

const useStyles = createUseStyles({
    container: {
        height: '100%',
        minHeight: 850
    },
    mainBlock: {
        marginLeft: 255,
        padding: 30,
        '@media (max-width: 1080px)': {
            marginLeft: 0
        }
    },
    contentBlock: {
        marginTop: 54
    }
});

function PrivateSection() {
    const theme = useTheme();
    const classes = useStyles({theme});
    // return task ? <PrivateSection/> : <PublicRoutes/>;

    return localStorage.getItem('myData') ? (
        <SidebarContext>
            <Row className={classes.container}>
                <SidebarComponent/>
                <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent/>
                    <div className={classes.contentBlock}>
                        <PrivateRoutes/>
                    </div>
                </Column>
            </Row>

        </SidebarContext>
    ) : (
       <PrivateRoutes/>
    );
}

export default PrivateSection;
