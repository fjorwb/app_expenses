import React from 'react';
import ReactDOM from 'react-dom';

import { AuthProvider } from './context/AuthContext';
import { TotalExpensesProvider } from './context/TotalMonthExpensesContext';

import './index.css';
import WebFont from 'webfontloader';
import Container from './elements/Container'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import favicon from './images/logo.png'
import Background from './elements/Background'
import PrivateRoute from '../src/elements/PrivateRoute'

import App from './App';

import {
    EditExpenses,
    ExpensesList,
    ExpensesByCategory,
    UserSignIn,
    UserSignUp
} from './components/index'

WebFont.load({
    google: {
      families: ['Work Sans: 200, 300,400,500,700']
    }
  });

const Index = () => {
  return ( 
    <>
      <Helmet>
        <link rel='shortcut icon' href={favicon} type='image/x-icon'/>
        <title>Expenses App</title>
      </Helmet>
      <AuthProvider>
        <TotalExpensesProvider>
          <BrowserRouter>
            <Container>
              <Routes>
                <Route path='/signin' element={<UserSignIn/>}/>
                <Route path='/signup' element={<UserSignUp/>}/>
                <Route path='/' element={
                  <PrivateRoute>
                    <App/>
                  </PrivateRoute>
                }/>
                <Route path='/editexpenses/:id' element={
                  <PrivateRoute>
                    <EditExpenses/>
                  </PrivateRoute>              
                }/>
                <Route path='/expenseslist' element={
                  <PrivateRoute>
                    <ExpensesList/>
                  </PrivateRoute>              
                }/>
                <Route path='/expensesbycategory' element={
                  <PrivateRoute>
                    <ExpensesByCategory/>
                  </PrivateRoute>
                }/>
              </Routes>
            </Container>
              <Background/>
          </BrowserRouter>
        </TotalExpensesProvider>
      </AuthProvider>
    </>
  )
}
 
  
  ReactDOM.render(<Index/>,document.getElementById('root'));
  
  export default Index