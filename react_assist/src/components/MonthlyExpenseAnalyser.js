import React from 'react';
import '../css/MonthlyExpenseAnalysis.css';
import CategoryExpenseCalculator from './CategoryExpenseCalculator';
import MonthYearSelector from './MonthYearSelector';

let URL;
if (process.env.NODE_ENV === 'development') {
    URL = 'http://localhost:5000';
} else {
    URL = 'https://assist.aryanabhi.in';
}

function getMonth(index) {
    switch (index) {
        case 0: return 'January';
        case 1: return 'February';
        case 2: return 'March';
        case 3: return 'April';
        case 4: return 'May';
        case 5: return 'June';
        case 6: return 'July';
        case 7: return 'August';
        case 8: return 'September';
        case 9: return 'October';
        case 10: return 'November';
        case 11: return 'December';
        default: return 'Invalid index!'
    }
}



class MonthlyExpenseAnalyser extends React.Component {

    //props.categories[]
    //props.expenses[]

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear()
        };
        this.handleFrameChange = this.handleFrameChange.bind(this);
    }

    handleFrameChange(month, year) {
        this.setState({
            currentMonth: month,
            currentYear: year
        });
    }

    render() {

        let overAllExpense = 0;
        const expenses = this.props.expenses;
        for(const expense of expenses){
            if(expense.month === this.state.currentMonth && expense.year === this.state.currentYear) {
                overAllExpense += Number(expense.amount)
            } 
        }
        const categories = this.props.categories;
        const categoryWiseExpenses = categories.map((category, key) => {
            return (
                <div className="col-md-3" key={key}> 
                    <CategoryExpenseCalculator 
                        category={category}
                        month={this.state.currentMonth}
                        year={this.state.currentYear}
                        expenses={this.props.expenses}
                        overAllExpense={overAllExpense}  
                    />
                </div>
            );
        })

        return (
            <div className="container monthly-expense-analysis-div">
                <div className="container monthly-expense-analysis-description">
                    <h3>Monthly expenditure analysis for {getMonth(this.state.currentMonth)}, {this.state.currentYear} : </h3>
                    <MonthYearSelector handleFrameChange={this.handleFrameChange}></MonthYearSelector>
                    <p>Total amount spent -> {overAllExpense} bucks</p>
                    <div className="row">
                        {categoryWiseExpenses}
                    </div>
                </div>
            </div>
        )
    }
}

export default MonthlyExpenseAnalyser;