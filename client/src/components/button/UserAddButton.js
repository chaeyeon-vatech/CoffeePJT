import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CreateUserMutation} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {UserSearchQuery} from "../../graphql/query";

export default function UserAddButton(username) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('');

    const [create] = useMutation(CreateUserMutation, {
            refetchQueries: [{query: UserSearchQuery}],
            variables: {
                username: content
            },
            onCompleted: (data) => {
                alert("유저 추가가 완료되었습니다.")
                setOpen(false);

            },

            onError: () => {
                alert("같은 이름은 등록하실 수 없습니다!")
            },
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
                        추가하실 이름을 입력해주세요!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="email"
                        onChange={e => setContent(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button onClick={create} color="primary">
                        추가
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
