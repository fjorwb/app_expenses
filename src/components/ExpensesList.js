import React from 'react'
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

import useGetExpenses from '../hooks/useGetExpenses';

import deleteExpense from '../firebase/deleteExpense'

import {Header, Title} from '../elements/Header'
import BtnBack from '../elements/BtnBack';
import TotalExpensesBar from './TotalExpensesBar';
import CategoryIcon from '../elements/CategoryIcon';
import formatAmount from '../Functions/FormatToCurrency';
import {format, fromUnixTime} from 'date-fns'
import {ReactComponent as IconDelete} from '../images/delete.svg'
import {ReactComponent as IconEdit} from '../images/edit.svg'


import {
    List,
    ListElement,
    Category,
    Description,
    Value,
    Date,
    ButtonsContainer,
    ButtonAction,
    ButtonLoadMOre,
    CentralButtonContainer,
    SubtitlesContainer,
    Subtitle
} from '../elements/ListElements'
import Button from '../elements/Button';


const ExpensesList = () => {
  const [expenses, getMoreExpenses, moreToCharge] = useGetExpenses()

  const formatDate = (date) => {
		return format(fromUnixTime(date),"MMMM dd yyyy")
  }

  const isDateEqual = (expenses, index, expense) => {
    if(index !== 0) {
      const currentExpenseDate = formatDate(expense.date)
      const lastExpenseDate = formatDate(expenses[index -1].date)
      if(currentExpenseDate === lastExpenseDate) {
        return true
      } else {
        return false
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>expenses list</title>
      </Helmet>
      <Header>
            <BtnBack/>
            <Title>expenses list</Title>
      </Header>
      <List>
        {expenses.map((expense,index) => {
          const {id, date, description, amount, category} = expense
          return(
            <div key={id}>
              {!isDateEqual(expenses, index, expense ) && 
              <Date>
                {formatDate(date)}
              </Date>
              }
              <ListElement key={id}>
                <Category>
                  <CategoryIcon id={category}/>
                  {category}
                </Category>
                <Description>{description}</Description>
                <Value>{formatAmount(amount)}</Value>
                <ButtonsContainer>
                  <ButtonAction as={Link} to={`/editexpenses/${id}`}>
                    <IconEdit/>
                  </ButtonAction>
                  <ButtonAction as="button" onClick={() => deleteExpense(id)}>
                    <IconDelete />
                  </ButtonAction>
                </ButtonsContainer>
            </ListElement>
            </div>
          )
          })}
          {moreToCharge && 
          <CentralButtonContainer>
            <ButtonLoadMOre onClick={() => getMoreExpenses()}>
              Load more
            </ButtonLoadMOre>
          </CentralButtonContainer>
          }
          {expenses.length === 0 && 
            <SubtitlesContainer>
              <Subtitle>
                There is no expense to show
              </Subtitle>
              <Button as={Link} to='/'>
                add expense
              </Button>
              </SubtitlesContainer>
          }
      </List>
      <TotalExpensesBar/>
    </>
  )
}

export default ExpensesList;