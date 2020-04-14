import React from 'react';
import '../css/Profile.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = '';
}

class Profile extends React.Component {

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
          <div>
            What's up {this.state.name}?
          </div>
        );
    }
}

export default Profile;