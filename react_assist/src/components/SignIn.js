import React from 'react';
import '../css/SignInUpForm.css';

class SignInForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: ''
        };
        this.signInHandler = this.signInHandler.bind(this);
    }

    signInHandler() {
        //check sign in details and verify with database, then call doSignIn
        this.props.doSignIn();
    }

    render(){
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
                    <p>{this.state.errorMsg}</p>
                    <span><button type="button" className="btn btn-outline-info" onClick={this.signInHandler}>Sign In</button></span>
                </form>
            </div>
        );
    }
}

export default SignInForm;