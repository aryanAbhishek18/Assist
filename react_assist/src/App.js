import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Profile from './components/Profile';
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
    this.setState({
      isLoggedIn: false
    });
  }

  doSignIn(e) {
    console.log("Sign in");
    this.setState({
      isLoggedIn: true
    });
  }

  doSignUp(e) {
    console.log("Sign up");
    this.setState({
      isLoggedIn: true
    });
  }

  render() {
    const ProfileWithSignOUT = (
      <div className="container">
        <button className="btn btn-warning" onClick={this.signOutHandler}>Sign Out</button>
          <Profile />
      </div>
    );

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
            <div className="offset-md-1 col-md-4">
              <SignInForm doSignIn={this.doSignIn}></SignInForm>
            </div>
            <div className="col-md-4 offset-md-1">
              <SignUpForm doSignUp={this.doSignUp}></SignUpForm>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container-fluid home">
        {this.state.isLoggedIn ? ProfileWithSignOUT : home}
      </div>
    );
  }
}

export default App;


// export default function App() {
//   return (
//     <Router>
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light">

//           <a className="navbar-brand" href="#">Navbar</a>
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>


//           <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link">Home</Link>
//               </li>
//               <li className="nav-item">
//               <Link to="/profile" className="nav-link">Profile</Link>
//               </li>
//               <li className="nav-item">
//               <Link to="/tasks" className="nav-link">Tasks</Link>
//               </li>
//             </ul>
//           </div>  

//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/profile">
//             <Profile />
//           </Route>
//           <Route path="/tasks">
//             <Tasks />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//       </header>
//     </Router>
    
//   );
// }

// function Home() {
//   return <h2>Hogggme</h2>;
// }

// function Profile() {
//   return <h2>Profile</h2>;
// }

// function Tasks() {
//   return <h2>Tasks</h2>;
// }