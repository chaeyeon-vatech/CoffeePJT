import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import TaskDeleteButton from "../../components/button/TaskDeleteButton";
import VacationBoard from "../firstpage/VacationBoard";

const useStyles = createUseStyles((theme) => ({
    root: {marginTop: "30px"},

    addButton: {
        backgroundColor: theme.color.darkRed,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important',
        width: "fit-content"
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue,
        width: "50%"
    },
    itemValue: {
        color: theme.color.grayishBlue2,
        width: "50%"
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    },
    input: {
        color: theme.color.black,
        display: "block",
        width: "200%",
        padding: "10px 0 10px 50px",
        fontSize: '15px !important',
        fontFamily: "Open Sans",
        fontWeight: "600",
        border: "0",
        borderRadius: "3px",
        outline: 0,
        textIndent: "70px",
        transition: "all .3s ease-in-out",
        margin: "0px auto",
        alignItems: "center",
        justifyContent: "center",
        LeftMargin: "30px",
        alignSelf: "center"
    },
    button: {
        position: "absolute",
        right: 0
    }

}));

function AfterCreate(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [contents, setContents] = useState();
    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    })

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}
            title='📋 주문 생성 및 휴가자 관리 📋'
            subtitle='주문 재작성 혹은 휴가자인 사람을 등록할 수 있습니다.'

            items={[

                <Row>
                    <Row horizontal='space-between' vertical='center'>
                        <Row>
                            <table>

                                <thead>
                                <tr>
                                    <th scope="col">Task 내용</th>
                                    <th scope="col">Task 재작성</th>

                                </tr>
                                </thead>

                                {contents && contents.map((content) => (


                                    <tbody>
                                    <td><span className={classes.itemTitle}>
                                        👏오늘은 {content.creater}님이 {content.title} 기념으로 커피 삽니다!👏</span></td>
                                    <td><TaskDeleteButton post_id={content._id}
                                                          user_id={localStorage.getItem('myData')}/></td>

                                    </tbody>


                                ))}
                            </table>

                        </Row>
                    </Row>
                </Row>,

                <VacationBoard/>


            ]}
        />

    );
}


export default AfterCreate;