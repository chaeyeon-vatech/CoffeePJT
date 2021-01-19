import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../../graphql/query";
import {TaskCreateMutation} from "../../graphql/mutation";
import TaskDeleteButton from "../../components/button/TaskDeleteButton";
import PaymentTable from "../../components/table/PaymentTable";

const useStyles = createUseStyles((theme) => ({
    root: {margin: "30px"},
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
    }

}));

function Task(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();

    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);

        }
    }, [data]);


    const [create] = useMutation(TaskCreateMutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {
                title: title
            },

            onError: () => {
                alert("주문 내용을 작성해주세요.")
            },
        }
    )

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

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            className={classes.root}
            title='📋 오늘의 주문 📋'
            subtitle='(예시) 12/30 오후 1시 커피- OOO 책임 연구원'

            items={[
                <Row horizontal='space-between' vertical='center'>
                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                        <input type="text" placeholder="주문을 추가해주세요." onChange={e => setTitle(e.target.value)}
                               className={classes.input}/>
                    </span>
                    {renderAddButton()}
                </Row>,
                <Row>

                    {contents && contents.map((content) => (

                        <Row horizontal='space-between' vertical='center'>
                            <Row>
                                <table>
                                    <td><span className={classes.itemTitle}>{content.title}</span></td>
                                    <td><TaskDeleteButton post_id={content._id}/></td>
                                </table>
                            </Row>
                        </Row>


                    ))}
                </Row>,
                <Row>
                    <PaymentTable/>
                </Row>


            ]}
        />
    );
}


export default Task;