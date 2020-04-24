import React from 'react';
import '../css/Task.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://aryanabhi.in';
}

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
    }

    async deleteTask() {
        try{
            const timestamp = this.props.timestamp;
            const userId = sessionStorage.getItem('userId');
            if(!userId) {
            return alert('There was some error in sign in!!');
            //do sign out
            }

            const url = URL + '/api/task/deleteTask';
            const res = await fetch(url, {  
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    userMongoId: sessionStorage.getItem('userId'),
                    timestamp: timestamp
                })
            });

            const data = await res.json();
            if(data.status !== 200) {
                alert(data.message);
                //do sign out
            }
            else{
                alert('Task deleted successfully!!');
                this.props.deleteTaskHandler(timestamp);
            }

        } catch(e){
            alert(e.message);
        }
    }

    render() {
        return (
            <div className="task-div">
                <p><strong>Title:</strong> {this.props.title}</p>
                <p><strong>Description:</strong> {this.props.description}</p>
                <span>
                    <button type="button" className="btn btn-danger" onClick={this.deleteTask}>Delete Task</button>
                </span>
            </div>
        );
    }

}

export default Task;