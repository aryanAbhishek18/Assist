import React from 'react';
import '../css/SignInUpForm.css';

function SignUpForm(props) {
    return (
        <div className="container signInUpDiv">
            <form>
                <div className="form-group">
                    <label for="signUp-name" className="col-form-label">Name:</label>
                    <input type="text" className="form-control" id="signUp-name"></input>
                </div>
                <div className="form-group">
                    <label for="signUp-email" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" id="signUp-email"></input>
                </div>
                <div className="form-group">
                    <label for="signUp-password" className="col-form-label">Password:</label>
                    <input type="password" class="form-control" id="signUp-password"></input>
                </div>
                <div className="form-group">
                    <label for="SignUp-confirm-password" className="col-form-label">Confirm Password:</label>
                    <input type="password" class="form-control" id="SignUp-confirm-password"></input>
                </div>
                <span><button type="button" className="btn btn-outline-info" onClick={props.signUpHandler}>Sign Up</button></span>
            </form>
        </div>
    );
}

export default SignUpForm;