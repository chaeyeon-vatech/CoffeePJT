import React from 'react';


function LoginForm() {

    return (
        <div className="login">
            <div className="login-triangle"/>

            <h2 className="login-header">☕ Log-In Page ☕</h2>

            <form className="login-container" action="/login">
                <p><input type="email" placeholder="Email"/></p>
                <p><input type="password" placeholder="Password"/></p>
                <p><input type="submit" value="로그인"/>
                    <form action="/register">
                        <input type="submit" value="회원가입"/>
                    </form>

                </p>

            </form>
        </div>


    );

}


export default LoginForm;
