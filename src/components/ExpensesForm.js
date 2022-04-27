import React,{useState, useEffect} from 'react'
import Button from '../elements/Button';
import {Form, FilterContainer, Input, BigInput, ButtonContainer} from '../elements/FormElements'
import {ReactComponent as IconPlus} from '../images/plus.svg'
import DatePicker from './DatePicker';
import SelectCategories from './SelectCategories';
import addExpense from '../firebase/addExpense';
import editExpense from '../firebase/editExpense';
import { getUnixTime } from 'date-fns';
import { useAuth } from '../context/AuthContext'
import Alert from '../elements/Alerts'
import { fromUnixTime } from 'date-fns/esm';
import { useNavigate } from 'react-router-dom';


const ExpensesForm = ({expense}) => {
    const {user} = useAuth()
    const [alertState, setAlertState] = useState(false)
    const [alert, setAlert] = useState({})
    const navigate = useNavigate()

    
    const [inputDescription, setInputDescription] = useState('')
    const [inputAmount, setInputAmount] = useState('')
    const [category, setCategory] = useState('Home')
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if(expense){
            if(expense.data().userUID === user.uid) {
                setCategory(expense.data().category)
                setDate(fromUnixTime(expense.data().date))
                setInputDescription(expense.data().description)
                setInputAmount(expense.data().amount)
            } else {
                navigate('/expenseslist')
            }
        }
    },[expense, user, navigate])
    
    const handleChange = (e) => {
        if(e.target.name === 'description') {
            setInputDescription(e.target.value)
        } else if (e.target.name === 'Amount') {
            setInputAmount(e.target.value.replace(/[^\d{0,9}(.\d{1,2})?$]/g, ''))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let amount = parseFloat(inputAmount).toFixed(2)

        if(inputDescription !== '' && inputAmount !== '') {
            if(amount) {
                if(expense){
                    editExpense({
                        id:expense.id,
                        category:category,
                        description:inputDescription,
                        amount:inputAmount,
                        date:getUnixTime(date)
                    }).then(() => {
                        navigate('/expenseslist')
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    addExpense({
                        category: category,
                        description: inputDescription,
                        amount: amount,
                        date: getUnixTime(date),
                        userUID: user.uid
                })
                    setAlertState(true)
                    setAlert({
                        type:'success', 
                        msg:'Expense added!'
                    })
                }
                setInputDescription('')
                setInputAmount('')
                setCategory('Home')
                setDate(new Date())
        } else {
                setAlertState(true)
                setAlert({
                    type:'error', 
                    msg:'Please, enter all fields required'
                })
            }
        } else {
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Please, enter all fields required'
            })
    }
}

    return ( 
        <Form onSubmit={handleSubmit}>
            <FilterContainer>
                <SelectCategories 
                    category={category}
                    setCategory={setCategory}
                    />
                <DatePicker date={date} setDate={setDate} / >
            </FilterContainer>

            <div>
                <Input
                    type='text'
                    name='description'
                    id='description'
                    placeholder='description'
                    value={inputDescription}
                    onChange={handleChange}
                    />
                <BigInput
                    type='text'
                    name='Amount'
                    id='Amount'
                    placeholder='$0.00'
                    // pattern="^\d*(\.\d{0,2})?$"
                    value={inputAmount}
                    onChange={handleChange}
                    />
            </div>
            <ButtonContainer>
                <Button as = "button" primary withIcon type='submit'>
                    {expense? 'edit expense' : 'add expense'}
                    <IconPlus/>
                </Button>
            </ButtonContainer>
            <Alert
                type={alert.type}
                msg={alert.msg}
                alertState={alertState}
                setAlertState={setAlertState}
                />
        </Form>
    );
}

export default ExpensesForm;