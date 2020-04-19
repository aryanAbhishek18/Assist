import React from 'react';
import '../css/CategoryExpenseCalculator.css';

function categoryExpenseCalculator(props) {
    const category = props.category;
    const month = props.month;
    const year = props.year;
    const overAllExpense = props.overAllExpense;

    if(overAllExpense === 0) {
        return (
             <div className="category-expense-div">
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Total amount spent:</strong> 0</p>
                <p><strong>Percentage:</strong> - </p>
            </div>
        );
    }

    let totalExpense = 0;
    for(const expense of props.expenses) {
        if (expense.category === category && expense.month === month && expense.year === year) {
            totalExpense += Number(expense.amount);
        }
    }


    return (
        <div className="category-expense-div">
            <p><strong>{category}</strong></p>
            <p>Spent -><strong>{totalExpense} bucks</strong></p>
            <p>Share -> <strong>{((totalExpense*100)/overAllExpense).toFixed(2)} %</strong> </p>
        </div>
    );
}

export default categoryExpenseCalculator;