import React from 'react';
import logo from '../logo.svg';
import '../css/Portal.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


import Home from '../components/Home';
import Profile from '../components/Profile';
import TaskManager from '../components/TaskManager';
import ExpenseManager from '../components/ExpenseManager';



let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = '';
}

class Portal extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        tasks: []
      };
    }

    async componentDidMount() {
      try{
        const userId = sessionStorage.getItem('userId');
        if(!userId) {
          return alert('There was some error in sign in!!');
          //do sign out
        }

        const url = URL + '/api/profile/getProfile';
        const res = await fetch(url, {  
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userMongoId: sessionStorage.getItem('userId')
          })
        });

        const data = await res.json();
        if(data.status !== 200) {
          return alert(data.message);
          //do sign out
        }

        else {
          this.setState({
            name: data.user.name,
            email: data.user.name,
            tasks: data.user.tasks
          });
        }

      }catch(e){
        return alert('There was some error!!');
        //do sign out
      }
    }

    render() {
        return (
          
          <Router>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light">
                <span className="navbar-brand nav-logo">
                  <img src={logo} className="Portal-logo" alt="logo" />
                  <h2>ASSIST</h2>
                </span>
                <button className="navbar-toggler portal-navbar-toggle-btn" type="button" data-toggle="collapse" data-target="#navbarTogglerPortal" aria-controls="navbarTogglerPortal" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerPortal">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/task">Task Manager</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/expense">Expense Manager</Link>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-warning" onClick={this.props.signOutHandler}>Sign Out</button>
                  </form>
                </div>
              </nav>
        
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/profile">
                <Profile name={this.state.name}/>
              </Route>
              <Route path="/task">
                <TaskManager name={this.state.name} tasks={this.state.tasks}/>
              </Route>
              <Route path="/expense">
                <ExpenseManager />
              </Route>
              <Route path="/">
                <Home name={this.state.name} />
              </Route>
            </Switch>
          </div>
        </Router>

        );
    }
}

export default Portal;





