import React, {useEffect, useState} from 'react';
import {Row} from 'simple-flexbox';
import {createUseStyles, useTheme} from 'react-jss';
import {IconCheckboxOn, IconCheckboxOff} from 'assets/icons';
import CardComponent from 'components/cards/CardComponent';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {SearchQuery, TaskQuery} from "../../util/query";
import {TaskCreateMutation} from "../../util/mutation";

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    },
    input: {
    display: "inline-block",
    width: "1000px",
    padding: "10px 0 10px 15px",
    fontFamily: "Open Sans",
    fontWeight: "400",
    color: "#377D6A",
    background: "#efefef",
    border: "0",
    borderRadius: "3px",
    outline: 0,
    textIndent: "70px",
    transition: "all .3s ease-in-out"
}

}));


function TasksComponent(props) {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [items, setItems] = useState([{title: '(예시 주문) 오후 1시 커피- OOO 책임연구원', checked: false}]);
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();

    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setContents(data.tasks);
        }
    }, [data]);



    const [create, {loading}] = useMutation(TaskCreateMutation, {
            refetchQueries: [{query: TaskQuery}],
            variables: {
                title: title
            },
        }
    )

    console.log(contents &&
        contents.map((content) => (content.title)));
    console.log(contents);


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

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            title='오늘의 주문'

            items={[
                <Row horizontal='space-between' vertical='center'>
                    <span className={[classes.itemTitle, classes.greyTitle].join(' ')}>
                      <input type="text" placeholder="(예시 주문) 오후 1시 커피- OOO 책임연구원" onChange={e => setTitle(e.target.value)} className={classes.input}/>
                    </span>
                    {renderAddButton()}
                </Row>,
                ...items.map((item, index) => (
                    <TaskComponent
                        classes={classes}
                        index={index}
                        item={item}
                        onCheckboxClick={onCheckboxClick}
                    />
                ))
            ]}
        />
    );
}

function TaskComponent({classes, index, item = {}, onCheckboxClick, onTagClick}) {

    return (
        <Row horizontal='space-between' vertical='center'>
            <Row>
                <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    {item.checked ? <IconCheckboxOn/> : <IconCheckboxOff/>}
                </div>
                <span className={classes.itemTitle}>{item.title}</span>
            </Row>

        </Row>
    );
}

function TagComponent({backgroundColor, color, index, onClick, text}) {
    return (
        <Row
            horizontal='center'
            vertical='center'
            style={{backgroundColor, color}}
            onClick={() => onClick(index)}
        >
            {text}
        </Row>
    );
}

export default TasksComponent;
