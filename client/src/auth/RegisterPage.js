import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { userQueryGQL, registerMutationGQL } from './mutation';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAuthToken } from './authToken';
import { TextField } from '@material-ui/core';



const AuthenticationForm = () => {
    const [_, setAuthToken] = useAuthToken();
    const [username, setUsername] = useState('');
    const [idNum, setIdNum] = useState('');
    const [password, setPassword] = useState('');


    const mutation = registerMutationGQL;

    const [create] = useMutation(mutation, {
        onCompleted: (data) => {
            setAuthToken(data.token);
        },
            refetchQueries: [{ query: userQueryGQL }],
            variables: {
                username: username,
                idNum: idNum,
                password: password
            },

        }
    );


    return (
        <>

            <input type='text' placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <input type='text' placeholder='IdNum' onChange={e => setIdNum(e.target.value)} />
            <input type='text' placeholder='Password' onChange={e => setPassword(e.target.value)} />;
            <TextField type='submit'
                       onClick={create}
                       value='회원가입' />;
        </>


    )
        ;
};

export default AuthenticationForm;