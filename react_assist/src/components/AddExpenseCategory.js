import React from 'react';
import '../css/AddExpenseCategory.css';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

class AddExpenseCategory extends React.Component {
    
    //props.categories
    //props.addCategory()
    
    constructor(props) {
        super(props);
        this.state = {
            newCategory: '',
            errorMsg: ''
        };
        this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
        this.addCategoryHandler = this.addCategoryHandler.bind(this);
    }

    categoryChangeHandler(event) {
        this.setState({
            newCategory: event.target.value
        });
    }

    async addCategoryHandler(event) {
        event.preventDefault();
        const newCategory = this.state.newCategory.trim();
        if(!newCategory) {
            this.setState({
                errorMsg: 'Category name cant be empty!'
            });
        }
        else{
            const userMongoId = sessionStorage.getItem('userId');
            if(!userMongoId) {
                return alert('User Id missing!!');
                //do sign out
            }
            else{
                const categoryName = this.state.newCategory.trim().toUpperCase();
                const found = this.props.categories.find(category => category === categoryName);
                if(found) {
                    return alert(`The category ${categoryName} already exists!`);
                }
                try{
                    const url = URL + '/api/expense/addCategory';
                    const categoryName = this.state.newCategory.trim().toUpperCase();
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            categoryName: categoryName,
                            userMongoId: sessionStorage.getItem('userId') 
                        }),
                    });
                    const data = await res.json();
                    if (data.status !== 200) {
                        return alert(data.message);
                    }                    
                    alert('Category added successfully!!');
                    this.setState({
                        newCategory: ''
                    });
                    this.props.addCategory(categoryName);

                } catch(e) {
                    return alert('There was some error!!');
                }
            }
        }
    }
    

    render() {
        return (
            <div className="container add-expense-category-div">
                <div className="form-group">
                    <label className="col-form-label">New Expense Category:</label>
                    <input type="text" className="form-control" value={this.state.newCategory} onChange={this.categoryChangeHandler}></input>
                </div>
                <p className="errorMsg"></p>
                <span><button type="button" className="btn btn-primary" onClick={this.addCategoryHandler}>Add Category</button></span>
            </div>
        );
    }
}

export default AddExpenseCategory;