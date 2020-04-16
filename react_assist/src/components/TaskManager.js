import React from 'react';
import '../css/TaskManager.css';
import AddTask from './AddTask';
import Task from './Task';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = '';
}


class TaskManager extends React.Component {

    //props.name
    //props.email

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
        this.addTaskHandler = this.addTaskHandler.bind(this);
        this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
        this.editTaskHandler = this.editTaskHandler.bind(this);
    }


    async componentDidMount() {
        try{
          const userId = sessionStorage.getItem('userId');
          if(!userId) {
            return alert('Kindly sign in again!');
            //do sign out
          }
  
          const url = URL + '/api/task/getTasks';
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
  
            const tasksReceived = data.tasks;
            let tasks = [];
            tasksReceived.forEach((task) => {
              tasks.push({
                title: task.title,
                description: task.description,
                timestamp: task.timestamp
              });
            });
          
            this.setState({
              tasks: tasks
            });
          }
  
        }catch(e){
          return alert('There was some error!!');
          //do sign out
        }
      }


    addTaskHandler(title, description, timestamp) {
        const newTask = {
            title: title,
            description: description,
            timestamp: timestamp
        };
        this.setState({
            tasks: [newTask, ...this.state.tasks]
        });
    }

    deleteTaskHandler(timestamp) {

    }

    editTaskHandler(newTitle, newDesc, timestamp) {

    }

    render() {

        let tasks = this.state.tasks.map((task, key) => {
            return (
                <div className="col-md-4">
                    <Task title={task.title} description={task.description} key={task.timestamp}></Task>
                </div>
            );
        });

        return (
            <div className="container task-manager-main-div">
                <h3 className="task-manager-greeting-msg">
                    You can manage your tasks here. Happy task managing {this.props.name} :)
                </h3>
                <div className="container task-manager-div">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <AddTask addTaskHandler={this.addTaskHandler}/>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
                <hr></hr>
                <div className="container task-list">
                    <div className="row">
                        {tasks}
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskManager;