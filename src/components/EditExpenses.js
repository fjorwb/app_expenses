import React from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import {Header, Title} from '../elements/Header'
import BtnBack from '../elements/BtnBack';
import TotalExpensesBar from './TotalExpensesBar';
import ExpensesForm from './ExpensesForm';
import useGetEditExpense from '../hooks/useGetEditExpense';

const EditExpenses = () => {
    const {id} = useParams()
    const [expense] = useGetEditExpense(id)

    return(

        <>
      <Helmet>
        <title>Edit Expense</title>
      </Helmet>
      <Header>
            <BtnBack route='/expenseslist'/>
            <Title>Edit Expense</Title>
      </Header>
      <ExpensesForm expense={expense}/>
      <TotalExpensesBar/>
    </>
        )
}
 
export default EditExpenses;