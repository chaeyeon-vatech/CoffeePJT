import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { loginMutationGQL, userQueryGQL } from './mutation';
import { useMutation } from '@apollo/react-hooks';
import { useAuthToken } from './authToken';
import { TextField } from '@material-ui/core';


const AuthenticationForm = () => {
    const [_, setAuthToken] = useAuthToken();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const[token,setToken]=useState('');
    const mutation = loginMutationGQL;


    const [create, { error, loading, data }] = useMutation(mutation, {
            refetchQueries: [{ query: userQueryGQL }],
            onCompleted: (data) => {
                setToken(data.login.token)

                localStorage.setItem("token",token);




            },
            variables: {
                login: login,
                password: password
            }
        }
    );

    console.log(token);



    return (
        <>

            <input type='text' placeholder='content' onChange={e => setLogin(e.target.value)} />
            <input type='text' placeholder='title' onChange={e => setPassword(e.target.value)} />;
            <TextField type='submit'
                       onClick={create}
                       unable={loading}
                       value='Login'
            />;
        </>


    )
        ;
};

export default AuthenticationForm;