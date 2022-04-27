import { useState, useEffect } from 'react';
import useGetMonthExpenses from './useGetMonthExpenses';

const useGetMonthExpensesByCategory = () => {
    const [expensesByCategory, setExpensesByCategory] = useState([])
    const expenses = useGetMonthExpenses()

    useEffect(() => {
        const TotalByCategory = expenses.reduce((result, current) => {
            const currentCategory = current.category
            const currentAmount = current.amount
    
            result[currentCategory] += currentAmount
    
            return result
    
        },{
            'Food':0,
            'Acc & Paymts':0,
            'Home':0,
            'Transportation':0,
            'Clothes':0,
            'Health & Clean':0,
            'Shopping':0,
            'Entertainment':0
        })
    
        setExpensesByCategory(Object.keys(TotalByCategory).map((element) => {
            return {category: element, amount:TotalByCategory[element]}
        }))
    },[expenses, setExpensesByCategory])


    return expensesByCategory;
}
 
export default useGetMonthExpensesByCategory;