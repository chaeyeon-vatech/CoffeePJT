import React from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {Column, Row} from 'simple-flexbox';
import {SidebarComponent, SidebarContext} from 'components/menu';
import HeaderComponent from 'components/menu/HeaderComponent';
import PrivateRoutes from './PrivateRoutes';
import {Route, Switch} from "react-router-dom";
import LINKS from "../resources/links";
import Create from "./paymentboard/Create";
import PublicRoutes from "./PublicRoutes";

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

function PublicSection() {
    const theme = useTheme();
    const classes = useStyles({theme});

    return (
        <SidebarContext>
            <Row className={classes.container}>
                <SidebarComponent/>
                <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent/>
                    <div className={classes.contentBlock}>
                        <PublicRoutes/>
                    </div>
                </Column>
            </Row>
        </SidebarContext>
    );
}

export default PublicSection;
