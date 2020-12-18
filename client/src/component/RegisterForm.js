import React from 'react';
import {Link} from "@material-ui/core";


function CreateButton() {

    return (
        <div className="login">
            <div className="login-triangle"/>

            <h2 className="login-header">☕ Register Page ☕</h2>

            <form className="login-container" action="/login">
                <p><input type="name" placeholder="Username"/></p>
                <p><input type="email" placeholder="Email"/></p>
                <p><input type="password" placeholder="Enter Password"/></p>
                <p><input type="submit" value="작성 완료"/>
                    <input onClick={event => window.location = '/login'}
                           type="submit" value="작성 취소"/></p>

            </form>
        </div>


    );

}


export default CreateButton;
