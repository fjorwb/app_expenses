import React from 'react'
import {Header, Title} from '../elements/Header'
import { Helmet } from 'react-helmet';
import BtnBack from '../elements/BtnBack';
import TotalExpensesBar from './TotalExpensesBar';
import useGetMonthExpensesByCategory from '../hooks/useGetMonthExpensesByCategory'
import {CategoriesList, CategoriesListElement, Category, Value} from '../elements/ListElements'
import CategoryIcon from '../elements/CategoryIcon'
import formatToCurrency from '../Functions/FormatToCurrency'


const ExpensesByCategory = () => {
    const expensesByCategory = useGetMonthExpensesByCategory()
    console.log(expensesByCategory);

    return ( 
    <>
      <Helmet>
        <title>expenses by category</title>
      </Helmet>

      <Header>
            <BtnBack/>
            <Title>By Category</Title>
      </Header>

      <CategoriesList>
        {expensesByCategory.map((element, index) => {
          const {category, amount} = element
          console.log(category, amount)
          return(
            <CategoriesListElement key={index}>
              <Category>
                <CategoryIcon  id={category}/>
                {category}</Category>
              <Value>{formatToCurrency(amount)}</Value>
            </CategoriesListElement>
          )
        })}
      </CategoriesList>

      <TotalExpensesBar/>
    </>
     );
}

export default ExpensesByCategory;