import React, { useState, useEffect, useContext } from 'react';

import useGetMonthExpenses from '../hooks/useGetMonthExpenses';

const TotalExpensesContext = React.createContext()

const useMonthTotal = () => useContext(TotalExpensesContext)

const TotalExpensesProvider = ({children}) => {
    const [total, setTotal] = useState(0)
    const expenses = useGetMonthExpenses()


    useEffect(() => {
        let cummulate = 0

        expenses.forEach((expense) => {
            cummulate += expense.amount
        })
        setTotal(cummulate)

    },[expenses])

    return (
        <TotalExpensesContext.Provider value={{total:total}}>
            {children}
        </TotalExpensesContext.Provider>
    )
}

export {TotalExpensesProvider, useMonthTotal}