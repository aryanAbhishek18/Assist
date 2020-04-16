import React from 'react';
import AddTask from './AddTask';
import Task from './Task';

class TaskManager extends React.Component {

    //props.name
    //props.tasks[]

    constructor(props) {
        super(props);
        this.state = {
            tasks: [...this.props.tasks]
        };
        this.addTaskHandler = this.addTaskHandler.bind(this);
        this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
        this.editTaskHandler = this.editTaskHandler.bind(this);
    }

    addTaskHandler(title, desc, timestamp, _id) {
        console.log(title + desc + timestamp + _id);
    }

    deleteTaskHandler(_id) {

    }

    editTaskHandler(newTitle, newDesc, _id) {

    }

    render() {

        let tasks = this.state.tasks.map((task, key) => {
            return (
                <div className="col-md-4">
                    <Task title={task.title} description={task.description} key={task._id}></Task>
                </div>
            );
        });

        return (
            <div className="container task-manager-main-div">
                <h3 className="task-manager-greeting-msg">
                    You can manage your tasks here.
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