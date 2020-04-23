import React from 'react';
import '../css/AddTask.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'http://aryanabhi.in:5000';
}

class AddTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            errorMsg: ''
        };
        this.addNewTaskHandler = this.addNewTaskHandler.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    }

    titleChangeHandler(event) {
        this.setState({
            title: event.target.value
        });
    }

    descriptionChangeHandler(event) {
        this.setState({
            description: event.target.value
        });
    }

    async addNewTaskHandler(event) {
        //check sign in details and verify with database, then call doSignIn
        event.preventDefault();
        let title = this.state.title.trim();
        let description = this.state.description.trim();
        if(!title) {
            this.setState({
                errorMsg: 'Title empty!'
            });
        }
        else if(!description) {
            this.setState({
                errorMsg: 'Description empty!'
            });
        }
        else{
            this.setState({
                errorMsg: ''
            });
            try {
                const url = URL + '/api/task/addTask';
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        title: title,
                        description: description,
                        userMongoId: sessionStorage.getItem('userId') 
                    }),
                });
                const data = await res.json();
                if (data.status !== 200) {
                    return alert(data.message);
                }
                const timestamp = data.timestamp;
                
                alert('Task added successfully!!');
                this.setState({
                    title: '',
                    description: ''
                });

                this.props.addTaskHandler(title, description, timestamp);

            } catch (e) {
                alert(e.message);
            }

        }
        
    }

    render(){
        return (
            <div className="container add-task-div">
                <form noValidate>
                    <div className="form-group">
                        <label className="col-form-label">Title:</label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.titleChangeHandler} required="required"></input>
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">Description:</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.descriptionChangeHandler} required="required"></input>
                    </div>
                    <p className='errorMsg'>{this.state.errorMsg}</p>
                    <span><button type="submit" className="btn btn-outline-info" onClick={this.addNewTaskHandler}>Add Task</button></span>
                </form>
            </div>
        );
    }
}

export default AddTask;