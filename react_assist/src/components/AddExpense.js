import React from 'react';
import '../css/AddExpense.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = '';
}

class AddExpense extends React.Component {
    
    render() {

        const options = this.props.categories.map((category) => {
            return <option className="form-control" value={category}>{category}</option>
        });

        return (
            <div className="container add-expense-div">
                <div className="form-group">
                    <label className="col-form-label">Select expense category:</label>
                    <select className="form-control">
                        {options}
                    </select>
                </div>
                <div className="form-group">
                    <label className="col-form-label">Amount spent:</label>
                    <input type="number" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label className="col-form-label">Description (Optional):</label>
                    <input type="text" className="form-control"></input>
                </div>
                <span><button type="button" className="btn btn-primary">Add Expense</button></span>
            </div>
        );
    }
}

export default AddExpense;