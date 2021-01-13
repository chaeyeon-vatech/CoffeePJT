import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import {TaskCreateMutation} from "../../graphql/mutation";
import TaskDeleteButton from "../../components/button/TaskDeleteButton";
import VacationBoard from "./VacationBoard";
import Button from "@material-ui/core/Button";

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
    const [items, setItems] = useState([{title: '(예시) 오후 1시 커피- OOO 책임', checked: false}]);
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();


    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    })


    const [create, {loading}] = useMutation(TaskCreateMutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {
                title: title,
                userid: localStorage.getItem('myData')
            },
            onCompleted: (data) => {
                alert("주문이 생성되었습니다!");
                window.location.href = '/after'


            },

            onError: () => {
                alert("주문 내용을 작성해주세요.")
            },
        }
    )

    function onCheckboxClick(index) {
        setItems((prev) => {
            const newItems = [...prev];
            newItems[index].checked = newItems[index].checked ? false : true;
            return newItems;
        });
    }


    function renderAddButton() {
        return (
            <Row
                horizontal='center'
                vertical='center'
                className={[classes.addButton].join(' ')}
                onClick={create}
            >
                +
            </Row>
        );
    }

    const handleClick = () => {
        if (window.confirm('사용자를 전환하시겠습니까?')) {

            localStorage.clear()
            window.location.href = '/'
        }
    }

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}
            title='📋 주문 생성 및 휴가자 관리 📋'
            subtitle='주문 재작성 혹은 휴가자인 사람을 등록할 수 있습니다.'

            items={[
                <Row>
                    {contents == null && <Button variant="contained" id='logout' onClick={handleClick}
                                                 className={classes.button}>{localStorage.getItem('name')}님이
                        맞으신가요?</Button>}

                </Row>,


                <Row horizontal='space-between' vertical='center'>



                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>

                        {contents == null &&
                        <input type="text" placeholder="어떤 이유로 커피를 사시나요?" onChange={e => setTitle(e.target.value)}
                               className={classes.input}/>}
                    </span>
                    {contents == null && renderAddButton()}
                    {/*<a href="/order">주문자 페이지로 이동</a>*/}
                </Row>,
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