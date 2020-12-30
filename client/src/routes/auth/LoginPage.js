import React, {useState} from 'react';
import {meGQL, loginMutationGQL} from './mutation';
import {useMutation} from '@apollo/react-hooks';
import {useAuthToken} from './authToken';
import './login.css';


const AuthenticationForm = () => {
    const [_, setAuthToken] = useAuthToken();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const loginmutation = loginMutationGQL;


    const [log, {loading}] = useMutation(loginmutation, {
            refetchQueries: [{query: meGQL}],
            onCompleted: (data) => {
                setAuthToken(data.login.token);
                localStorage.setItem('myData', data.login.token);
                window.location.href = '/order';


            },
            onError: () => {
                alert("로그인에 실패했습니다.")
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

                <h3>☃ 플랫폼 사업팀 단체 주문 Board ☃</h3>
                <input id='tab-1' type='radio' name='tab' className='sign-in' checked/><label htmlFor='tab-1'
                                                                                              className='tab'>Sign
                In</label>
                <input id='tab-2' type='text' name='tab' className='sign-up'/><label htmlFor='tab-2'
                                                                                     className='tab'>Sign
                Up</label>
                <div className='login-form'>
                    <div className='sign-in-htm'>
                        <div className='group'>
                            <label className='label'>Email</label>
                            <input type='text' placeholder='email' onChange={e => setLogin(e.target.value)}
                                   className='input'/>
                        </div>
                        <div className='group'>
                            <label htmlFor='pass' className='label'>Password</label>
                            <input type='text' placeholder='password' onChange={e => setPassword(e.target.value)}
                                   className='input'/>
                        </div>
                        <div className='group'>
                            <input type='submit'
                                   onClick={log}
                                   className='button'
                                   unable={loading}
                                   value='Login'
                            />;
                        </div>

                        <div className='group'>
                            <a href='/signup' className='button'>아직 회원이 아니신가요?</a>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationForm;