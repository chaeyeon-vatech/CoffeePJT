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

export default function FormDialog(username) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('');

    const mutation = UpdateUserMutation;

    const [update] = useMutation(mutation, {
            refetchQueries: [{query: UserSearchQuery, MeQuery}],
            variables: {
                id: username.id,
                username: content
            },
            onCompleted: (data) => {
                alert("정보 수정이 완료되었습니다.")
                setOpen(false);
            },
            onError: () => {
                alert("다시 시도해주세요!")
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
                유저 이름 수정
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">유저 이름 수정</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {username.username}님의 이름을 변경하시겠습니까?
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="수정하실 이름을 입력해주세요."
                        defaultValue={username.username}
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
        </div>
    );
}
