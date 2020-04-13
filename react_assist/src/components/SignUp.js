import React from 'react';
import '../css/SignInUpForm.css';

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass: '',
            confPass: '',
            errorMsg: ''
        };
        this.signUpHandler = this.signUpHandler.bind(this);
    }
    signUpHandler(){
        //ckeck the sign up details and verify with database, then call signUpHandler()
        this.props.doSignUp();
    }
    render() {
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
                        <input type="password" className="form-control" id="signUp-password"></input>
                    </div>
                    <div className="form-group">
                        <label for="SignUp-confirm-password" className="col-form-label">Confirm Password:</label>
                        <input type="password" className="form-control" id="SignUp-confirm-password"></input>
                    </div>
                    <p className='errorMsg'>{this.state.errorMsg}</p>
                    <span><button type="button" className="btn btn-outline-info" onClick={this.signUpHandler}>Sign Up</button></span>
                </form>
            </div>
        );
    }
}

export default SignUpForm;