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
import {useMutation, useQuery} from "@apollo/react-hooks";
import {MeQuery, Ordermen, UserSearchQuery, VacationQuery} from "../../graphql/query";
import {BackUserMutation, multipleDelete, OrderBackMutation, UpdateUserMutation} from "../../graphql/mutation";
import FormDialog from "../../routes/userboard/Dialog";
import UserDeleteButton from "../button/UserDeleteButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import UserAddButton from "../button/UserAddButton";
// import UserAddButton from "../button/UserAddButton";
// import Divider from '@material-ui/core/Divider';


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
    button: {
        // margin: theme.spacing(0.5, 0),

    },
    border: {
        border: "none"

    },
    addbutton: {
        justify: "flex-end",
        // display: "flex",
        // textAlign:"right",
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
    const [checked, setChecked] = React.useState([]);
    const [id, setId] = React.useState([]);
    const [left, setLeft] = React.useState([1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('');


    const {data: order} = useQuery(Ordermen);

    useEffect(() => {
        if (order) {
            setLeft(order.includedOrdermen);
        }
    }, [order]);


    const [mdelete, {loading}] = useMutation(multipleDelete, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {
                alert("미주문자로 전환되었습니다!");
                window.location.reload();

            }
        }
    )

    const [update] = useMutation(UpdateUserMutation, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {
                id: checked.map((c) => (c._id)).toString(),
                username: content
            },
            onCompleted: (data) => {

                alert("정보 수정이 완료되었습니다.")
                setOpen(false);
                window.location.href = '/settings';
            }
        }
    )


    console.log(checked.map((c) => (c._id)).toString());

    const [orderback] = useMutation(OrderBackMutation, {
            refetchQueries: [{query: Ordermen, VacationQuery}],
            variables: {ids: checked.map((c) => (c._id))},
            onCompleted: () => {

                alert("주문자로 전환되었습니다!");
                window.location.href = '/create';

            }
        }
    )


    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

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

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const [length, setLength] = useState();

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
                            className={classes.button}
                            onClick={mdelete}
                            disabled={leftChecked.length === 0}
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
                            disabled={leftChecked.length === 0 || leftChecked.length > 1}
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
                            <Button onClick={update} color="primary">
                                변경
                            </Button>
                        </DialogActions>
                    </Dialog>

                </th>
            </table>

            <Grid item>{customList('주문자', left)}</Grid>

        </Grid>


    );
}
