import React from 'react';
import '../css/Task.css';

class Task extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="task-div">
                <p><strong>Title:</strong> {this.props.title}</p>
                <p><strong>Description:</strong> {this.props.description}</p>
                <button type="button" className="btn btn-danger">Delete Task</button>
            </div>
        );
    }

}

export default Task;