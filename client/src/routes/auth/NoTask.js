import React, {useState} from 'react';
import {meGQL, loginMutationGQL} from './mutation';
import {useMutation} from '@apollo/react-hooks';
import {useAuthToken} from './authToken';
import './login.css';


const AuthenticationForm = () => {

    return (


        <div className='login-wrap'>
            <div className='login-html'>

                <h3>현재 주문이 없습니다.</h3>
                <h5>주문을 생성하시겠습니까?</h5>
                <input id='tab-1' type='radio' name='tab' className='sign-in' checked/><label htmlFor='tab-1'
                                                                                              className='tab'/>
                <input id='tab-2' type='text' name='tab' className='sign-up'/><label htmlFor='tab-2'
                                                                                     className='tab'/>
                <div className='login-form'>


                    <div className='group'>
                        <input type='submit'
                               className='lbutton'
                               value='주문 생성'/>;
                    </div>


                </div>
            </div>
        </div>
    );
};

export default AuthenticationForm;