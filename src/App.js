import React from 'react';

import { Helmet } from 'react-helmet';
import { ButtonsContainer, HeaderContainer, Title, Header } from './elements/Header';
import Button from './elements/Button'
import LogOutBtn from './elements/CloseSessionBtn';
import ExpensesForm from './components/ExpensesForm';
import TotalExpensesBar from './components/TotalExpensesBar';

const App = () => {
  return (
    <>
      <Helmet>
        <title>add expense</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>add expense</Title>
          <ButtonsContainer>
            <Button to='/expensesbycategory'>Categories</Button>
            <Button to='/expenseslist'>Expenses List</Button>
            <LogOutBtn/>
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
      <ExpensesForm/>
      <TotalExpensesBar/>
    </>
  )
}

export default App;
