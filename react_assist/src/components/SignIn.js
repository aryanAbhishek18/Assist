import React from 'react';
import '../css/SignInUpForm.css';

function SignInForm(props) {
    return (
        <div className="container signInUpDiv">
            <form>
                <div className="form-group">
                    <label for="signIn-email" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" id="signIn-email"></input>
                </div>
                <div className="form-group">
                    <label for="signIn-password" className="col-form-label">Password:</label>
                    <input type="password" class="form-control" id="signIn-password"></input>
                </div>
                <span><button type="button" className="btn btn-outline-info" onClick={props.signInHandler}>Sign In</button></span>
            </form>
        </div>
    );
}

export default SignInForm;