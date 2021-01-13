import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OrderBoard from "./AfterOrder";
import IceBoard from "./IceBoard";
import EtcBoard from "./etcBoard";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: 'center',
        color: "#6d4c41",
    },
    card: {maxWidth: 345},
    color: {
        brown: "#6d4c41"
    }
}));

export default function MenuBoard() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                    <Tab
                        value="one"
                        label="커피"
                        wrapped
                        {...a11yProps('one')}
                    />
                    <Tab value="two" label="아이스크림" {...a11yProps('two')} />
                    <Tab value="three" label="기타 음료" {...a11yProps('three')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                <OrderBoard/>
            </TabPanel>
            <TabPanel value={value} index="two">
                <IceBoard/>
            </TabPanel>
            <TabPanel value={value} index="three">
                <EtcBoard/>
            </TabPanel>
        </div>
    );
}
