import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {useQuery} from "@apollo/react-hooks";
import {AllUserQuery} from "../../graphql/query";
import FormDialog from "../../routes/userboard/Dialog";
import UserDeleteButton from "../button/UserDeleteButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import UserAddButton from "../button/UserAddButton";
import {MultipleUserDelete, UpdateUser} from "../../graphql/useMutation";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: "auto",
        height: "auto",
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    border: {
        border: "none"

    },
    addbutton: {
        justify: "flex-end",
        float: "right"
    }
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function UserEditTable() {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');

    const {data: order} = useQuery(AllUserQuery);

    useEffect(() => {
        if (order) {
            setList(order.allUsers);
        }
    }, [order]);

    const listChecked = intersection(checked, list);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const customList = (title, items) => (
        <Card>
            <List className={classes.list} dense component="div" role="list">
                <table>
                    <thead>
                    <tr>
                        <th scope="col">사용자 이름</th>
                        <th scope="col">변경</th>
                        <th scope="col">삭제</th>


                    </tr>
                    </thead>
                    <tbody>
                    {items.map((value) => {
                        const labelId = `transfer-list-all-item-${value}-label`;

                        return (
                            <tr style={{marginBottom: 20}}>
                                <td>
                                    <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>

                                        <ListItemIcon>
                                            <Checkbox
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </ListItemIcon>

                                        <ListItemText id={labelId} primary={value.username}/>

                                    </ListItem>
                                </td>
                                <td><FormDialog username={value.username} id={value._id}/></td>
                                <td><UserDeleteButton post_id={value._id}/></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <ListItem/>
            </List>
        </Card>
    );


    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <table className={classes.border}>
                <th>
                    <td className={classes.addbutton}>
                        <UserAddButton/>
                    </td>
                    <td>
                        <Button
                            variant="outlined"
                            onClick={MultipleUserDelete(checked)}
                            disabled={listChecked.length === 0}
                            aria-label="move selected right"
                            color="secondary"
                        >
                            선택 삭제
                        </Button>
                    </td>

                    <td>
                        <Button
                            variant="outlined"
                            className={classes.button}
                            onClick={handleClickOpen}
                            disabled={listChecked.length === 0 || listChecked.length > 1}
                            aria-label="move selected right"
                            color="primary"
                        >
                            선택 수정
                        </Button>
                    </td>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">유저 이름 수정</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {checked.map((c) => (c.username))}님의 이름을 변경하시겠습니까?
                            </DialogContentText>
                            <TextField
                                defaultValue={checked.map((c) => (c.username))}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="수정하실 이름을 입력해주세요."
                                type="email"
                                onChange={e => setContent(e.target.value)}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={handleClose} color="primary">
                                취소
                            </Button>
                            <Button onClick={UpdateUser(checked, content, setOpen)} color="primary">
                                변경
                            </Button>
                        </DialogActions>
                    </Dialog>

                </th>
            </table>

            <Grid item>{customList('주문자', list)}</Grid>

        </Grid>


    );
}
