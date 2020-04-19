import React from 'react';
import '../css/ExpenseManager.css';
import AddExpenseCategory from './AddExpenseCategory';
import AddExpense from './AddExpense';
import MonthlyExpenseAnalyser from './MonthlyExpenseAnalyser';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = '';
}


class ExpenseManager extends React.Component {

    //props.name

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            expenses: []
        };
        this.addCategoryHandler = this.addCategoryHandler.bind(this);
        this.addExpenseHandler = this.addExpenseHandler.bind(this);
    }

    async componentDidMount() {
        try{
            const userMongoId = sessionStorage.getItem('userId');
            if(!userMongoId){
                alert('User id missing! Please sign in again.');
                //do sign out
            }
            else{
                const url = URL + '/api/expense/getCategoriesAndExpenses'
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        userMongoId: userMongoId
                    }),
                });

                const data = await res.json();
                console.log(data);
                if(data.status !== 200) {
                    alert(data.message);
                    alert('There was some error! Sign in again.');
                    //do sign out
                }
                else{
                    const categories = data.categories;
                    const expenses = data.expenses;

                    const stateCategories = categories.map((category) => {
                        return category.categoryName;
                    });
                    this.setState({
                        categories: stateCategories,
                        expenses: [...expenses]
                    });
                }
            }
        }catch(e){
            alert('There was some error! Sign in again.');
            //do sign out
        }
    }

    addCategoryHandler(newCategory){
        console.log(newCategory);
        this.setState({
            categories: [...this.state.categories, newCategory.toUpperCase()]
        });
    }

    addExpenseHandler(newExpense) {
        this.setState({
            expenses: [...this.state.expenses, newExpense]
        });
    }


    render() {
        return (
            <div className="container expense-manager-main-div">
                <h3 className="expense-manager-greeting-msg">
                    You can keep track of your expenses here. Happy expense managing {this.props.name} :)
                </h3>
                <div className="container expense-manager-div">
                    <div className="row">
                        <div className="offset-md-1 col-md-4">
                            <AddExpenseCategory categories={this.state.categories} addCategory={this.addCategoryHandler} />
                        </div>
                        <div className="col-md-4 offset-md-2">
                            <AddExpense categories={this.state.categories} addExpense={this.addExpenseHandler} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <MonthlyExpenseAnalyser categories={this.state.categories} expenses={this.state.expenses} />
            </div>
        );
    }
}

export default ExpenseManager;