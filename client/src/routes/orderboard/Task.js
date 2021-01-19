import React, {useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.darkRed,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '3px !important',
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
        padding: "5px 0 10px 50px",
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
    border: {
        backgroundColor: "whitesmoke",
        fontSize: '15px !important',
        fontFamily: "Do Hyeon",
        fontWeight: "600",
    }

}));

function Task(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [items, setItems] = useState([{title: '(예시) 오후 1시 커피- OOO 책임', checked: false}]);
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();


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
                // onClick={create}
            >
                +
            </Row>
        );
    }

    return (

        <Row>

            {contents && contents.map((content) => (


                <table className={classes.border}>

                    {/*오늘은 ""님이 ""기념으로 "" 쏩니다!*/}
                    <td><span className={classes.itemTitle}>☕ 오늘의 주문 : {content.title} ☕</span></td>
                    <td><span className={classes.itemTitle}>👏 결제자님 : {content.title} 👏</span></td>
                </table>


            ))}
        </Row>


    );
}


export default Task;

