import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UpdateUserMutation} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {MeQuery, UserSearchQuery} from "../../graphql/query";

export default function UserAddButton(username) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('');
    const [click, setClick] = useState(false);


    const mutation = UpdateUserMutation;


    // $userid:ID! $orderid:ID! $menu:String! $hi:String!
    const [update, {loading}] = useMutation(mutation, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {
                id: username.id,
                username: content
            },
            onCompleted: (data) => {

                alert("정보 수정이 완료되었습니다.")
                setOpen(false);
                window.location.href = '/settings';
            }
        }
    )

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                유저 추가
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">유저 추가</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       유저를 추가하고 싶으신가요?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="추가하실 이름을 입력해주세요."
                        type="email"
                        onChange={e => setContent(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button  onClick={update} color="primary">
                        변경
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
