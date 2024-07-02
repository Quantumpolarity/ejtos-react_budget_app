import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { dispatch, budget, expenses, currency } = useContext(AppContext);
    const [formattedBudget, setFormattedBudget] = useState(currency + budget);

    useEffect(() => {
        setFormattedBudget(currency + budget);
    }, [currency, budget]);

    const handleBudgetChange = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
        const newBudget = parseInt(inputValue, 10);

        if (isNaN(newBudget)) {
            setFormattedBudget(currency);
            return;
        }

        const totalExpenses = expenses.reduce((total, item) => {
            return (total += item.cost);
        }, 0);

        if (newBudget > 20000) {
            alert("The budget cannot exceed funds " + currency + "20,000");
            setFormattedBudget(currency + budget);
            return;
        }

        if (newBudget < totalExpenses) {
            alert("The budget cannot be less than the spending");
            setFormattedBudget(currency + budget);
            return;
        }

        setFormattedBudget(currency + inputValue);

        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: 
                <input 
                    type="text" 
                    value={formattedBudget} 
                    onChange={handleBudgetChange}
                    onFocus={(e) => e.target.select()} // Optional: Select all text on focus
                />
            </span>
        </div>
    );
};

export default Budget;
