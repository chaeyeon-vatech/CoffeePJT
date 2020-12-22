import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { userQueryGQL, registerMutationGQL, meGQL, loginMutationGQL } from './mutation';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAuthToken } from './authToken';
import { TextField } from '@material-ui/core';

import authGate from './authGate';
import { removeDirectivesFromDocument } from '@apollo/client/utilities';

import './login.css';
import { Link } from 'react-router-dom';


const AuthenticationForm = () => {
    const [_, setAuthToken] = useAuthToken();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [idNum, setIdNum] = useState('');
    const [token, setToken] = useState('');
    const loginmutation = loginMutationGQL;
    const registermutation = registerMutationGQL;

    const [reg] = useMutation(registermutation, {
            onCompleted: (data) => {
                setAuthToken(data.token);

                alert('회원가입이 완료되었습니다.');
            },
            refetchQueries: [{ query: meGQL }],
            variables: {
                username: username,
                idNum: idNum,
                password: password
            }

        }
    );


    const [log, { error, loading, data }] = useMutation(loginmutation, {
            refetchQueries: [{ query: meGQL }],
            onCompleted: (data) => {
                setAuthToken(data.login.token);
                setToken(data.login.token);
                localStorage.setItem('token', token);
                window.location.href = '/order';


            },
            variables: {
                login: login,
                password: password
            }
        }
    );


    return (


        <div className='login-wrap'>
            <div className='login-html'>
                <input id='tab-1' type='radio' name='tab' className='sign-in' checked /><label htmlFor='tab-1'
                                                                                               className='tab'>Sign
                In</label>
                <input id='tab-2' type='radio' name='tab' className='sign-up' /><label htmlFor='tab-2'
                                                                                       className='tab'>Sign
                Up</label>
                <div className='login-form'>
                    <div className='sign-in-htm'>
                        <div className='group'>
                            <label className='label'>Username</label>
                            <input type='text' placeholder='content' onChange={e => setLogin(e.target.value)}
                                   className='input' />
                        </div>
                        <div className='group'>
                            <label htmlFor='pass' className='label'>Password</label>
                            <input type='text' placeholder='title' onChange={e => setPassword(e.target.value)}
                                   className='input' />
                        </div>
                        <div className='group'>
                            <TextField type='submit'
                                       onClick={log}
                                       className='button'
                                       unable={loading}
                                       value='Login'
                            />;
                        </div>

                        <div className='group'>
                            <a href='/signup' className='button' >아직 회원이 아니신가요?</a>
                        </div>


                    </div>
                </div>
            </div>
        </div>);
};

export default AuthenticationForm;