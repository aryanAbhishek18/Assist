import React from 'react';
import logo from './logo.svg';
import './App.css';
import Portal from './components/Portal';
import SignUpForm from './components/SignUp';
import SignInForm from './components/SignIn';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.signOutHandler = this.signOutHandler.bind(this);
    this.doSignIn = this.doSignIn.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
  }

  signOutHandler(e) {
    sessionStorage.removeItem('assistToken');
    this.setState({
      isLoggedIn: false
    });
  }

  doSignIn(e) {
    this.setState({
      isLoggedIn: true
    });
  }

  doSignUp(e) {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    const LoggedInContent = <Portal signOutHandler={this.signOutHandler}/>;

    const home = (
      <div className="container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container home-desc">
          <h3>Welcome to Assist</h3>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-4 signInUpContainer">
              <SignInForm doSignIn={this.doSignIn}></SignInForm>
            </div>
            <div className="col-md-2">

            </div>
            <div className="col-md-4 signInUpContainer">
              <SignUpForm doSignUp={this.doSignUp}></SignUpForm>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container-fluid home">
        {this.state.isLoggedIn ? LoggedInContent : home}
      </div>
    );
  }
}

export default App;