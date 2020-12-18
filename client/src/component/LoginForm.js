import React from 'react';



function CreateButton() {

    return (
        <div className="login">
            <div className="login-triangle"/>

            <h2 className="login-header">☕ Log-In Page ☕</h2>

            <form className="login-container">
                <p><input type="email" placeholder="Email"/></p>
                <p><input type="password" placeholder="Password"/></p>
                <p><input type="submit" value="로그인"/><input type="submit" value="회원가입"/></p>

            </form>
        </div>


    );

}





export default CreateButton;
