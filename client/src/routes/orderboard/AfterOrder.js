import React, {useEffect, useState} from 'react';
import {Column, Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import UserManageTable from '../../components/table/UserManageTable';
import UserTable from "../../components/table/UserTable";
import DeleteButton from "../../components/button/DeleteButton";
import ChangeGiveupButton from "../../components/button/ChangeGiveup";
import Grid from "@material-ui/core/Grid";
import {useQuery} from "@apollo/react-hooks";
import {MeQuery, TaskQuery} from "../../graphql/query";


const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `5px solid ${theme.color.darkRed}`,
        borderRadius: 5,
        cursor: 'pointer'
    },
    graphSection: {
        padding: 24
    }
}));

function OrderBoard() {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [name, setName] = useState();
    const [position, setPosition] = useState();
    const [status, setStatus] = useState();

    const [contents, setContents] = useState('');
    const [count, setCount] = useState('');

    const {data: task} = useQuery(TaskQuery);
    useEffect(() => {
        if (task) {
            setContents(data.tasks);

        }
    }, [task]);


    const {data} = useQuery(MeQuery, {
        variables: {
            userid: localStorage.getItem('myData')
        }
    });


    useEffect(() => {
        if (data) {
            setName(data.me.username);
            setPosition(data.me.position);
            setStatus(data.me.status);

        }
    }, [data]);

    console.log(name, position, status);


    return position === "주문포기" ? (

        <Row
            horizontal='space-between'
            className={classes.lastRow}
            breakpoints={{1024: 'column'}}
        >
            <table className={classes.border}>

                {contents && contents.map((content) => (
                    <td><span
                        className={classes.itemTitle}>👏  오늘은 {content.creater}님이 {content.title} 기념으로 커피 쏩니다! 👏</span>
                    </td>))}
            </table>

        </Row>,

            <div className={classes.todayTrends}>
                <ChangeGiveupButton userid={localStorage.getItem("myData")}/>
            </div>

    ) : (

        <Row
            flexGrow={1}
            className={classes.container}
            horizontal='center'
            breakpoints={{1024: 'column'}}
        >
            <Column
                wrap
                flexGrow={7}
                flexBasis='735px'
                className={classes.graphSection}
                breakpoints={{1024: {width: 'calc(100% - 48px)', flexBasis: 'auto'}}}
            >
                <UserTable/>
            </Column>


        </Row>


    )


}

export default OrderBoard;
