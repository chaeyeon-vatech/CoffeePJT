import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {CreateUserMutation, UpdateUserMutation} from "../../graphql/mutation";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {MeQuery, SearchQuery, UserSearchQuery} from "../../graphql/query";
import FormDialog from "../../routes/userboard/Dialog";
import UserDeleteButton from "./UserDeleteButton";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export default function SearchButton() {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState('');
    const [click, setClick] = useState(false);
    const [result, setResult] = useState();
    const [search, setSearch] = useState();

    const mutation = UpdateUserMutation;


    const {data: se} = useQuery(SearchQuery, {
        variables: {
            word: search
        },

    });


    useEffect(() => {
        if (se) {
            setResult(se.user);

        }
    }, [se]);

    // $userid:ID! $orderid:ID! $menu:String! $hi:String!
    const [create, {loading}] = useMutation(CreateUserMutation, {
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
            <Button variant="outlined" onClick={handleClickOpen} color="primary">
                유저 검색
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">유저 추가</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        검색 결과입니다.
                    </DialogContentText>
                    <>
                        <table>
                            {/*<caption>유저 추가/삭제</caption>*/}

                            <thead>
                            <tr>
                                <th scope="col">사용자 이름</th>
                                <th scope="col">변경</th>
                                <th scope="col">삭제</th>


                            </tr>
                            </thead>
                            <tbody>

                            {result &&
                            result.map((content) => (


                                <tr style={{marginBottom: 20}}>
                                    <td>{content.username}</td>
                                    <td><FormDialog id={content._id} username={content.username}/></td>
                                    <td><UserDeleteButton post_id={content._id}/></td>
                                    {/*<td><UpdateButton id={content._id} username={content.username}/></td>*/}


                                </tr>


                            ))}


                            </tbody>


                        </table>
                    </>
                    {/*<TextField*/}
                    {/*    autoFocus*/}
                    {/*    margin="dense"*/}
                    {/*    id="name"*/}
                    {/*    // label="추가하실 이름을 입력해주세요."*/}
                    {/*    type="email"*/}
                    {/*    onChange={e => setContent(e.target.value)}*/}
                    {/*    fullWidth*/}
                    {/*/>*/}
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
