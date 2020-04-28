import React from 'react';
import '../css/AddExpense.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class AddExpense extends React.Component {

    //props.categories
    //props.addExpense()

    constructor(props) {
        super(props);
        const categories = props.categories;
        this.state = {
            category: 'Select an option from dropdown',
            amount: 0,
            description: ''
        };
        this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
        this.amountChangeHandler = this.amountChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.addExpenseHandler = this.addExpenseHandler.bind(this);
    }

    categoryChangeHandler(event) {
        this.setState({
            category: event.target.value
        });
    }

    amountChangeHandler(event) {
        this.setState({
            amount: event.target.value
        });
    }

    descriptionChangeHandler(event) {
        this.setState({
            description: event.target.value
        });
    }

    async addExpenseHandler(event) {
        event.preventDefault();
        if(this.state.category === 'Select an option from dropdown' || this.state.category === "0" || (!this.state.category)) {
            return alert('Select a valid category!');
        }
        else if(!this.state.amount) {
            return alert('Enter a valid amount!');
        }
        else if(!this.state.description) {
            return alert('Description cant be empty!');
        }
        else{
            try{
                const token = sessionStorage.getItem('assistToken');
                if(!token) {
                    return alert('Token missing! Please sign out and sign in again!');
                }
                else{
                    const url = URL + '/api/expense/addExpense';
                    const created = new Date();
                    const date = created.getDate();
                    const month = created.getMonth();
                    const year = created.getFullYear();
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            token: sessionStorage.getItem('assistToken'),
                            category: this.state.category,
                            amount: this.state.amount,
                            description: this.state.description.trim(),
                            created: created,
                            date: date,
                            month: month,
                            year: year
                        })
                    });

                    const data = await res.json();
                    if(data.status !== 200){
                        return alert('Internal server error!');
                    }
                    alert(data.message);
                    const newExpense = {
                        category: this.state.category,
                        amount: this.state.amount,
                        description: this.state.description.trim(),
                        created: created,
                        date: date,
                        month: month,
                        year: year
                    };
                    this.props.addExpense(newExpense);
                    this.setState({
                        category: 'Select an option from dropdown',
                        amount: 0,
                        description: ''
                    });
                }
            } catch(e){
                return alert('There was some error! Please sign out and sign in again!');
            }
        }
    }
    
    render() {

        let allOptions = [<option value="0" key={-1}>Select an option from dropdown</option>]
        const options = this.props.categories.map((category, key) => {
            return <option value={category} key={key}>{category}</option>
        });
        allOptions = allOptions.concat(options);

        return (
            <div className="container add-expense-div">
                <div className="form-group">
                    <label className="col-form-label">Select expense category:</label>
                    <select className="form-control" value={this.state.category} onChange={this.categoryChangeHandler} required>
                        {allOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label className="col-form-label">Amount spent:</label>
                    <input type="number" className="form-control" value={this.state.amount} onChange={this.amountChangeHandler} min="0" required></input>
                </div>
                <div className="form-group">
                    <label className="col-form-label">Description:</label>
                    <input type="text" className="form-control" value={this.state.description} onChange={this.descriptionChangeHandler} required></input>
                </div>
                <span><button type="button" className="btn btn-primary" onClick={this.addExpenseHandler}>Add Expense</button></span>
            </div>
        );
    }
}

export default AddExpense;