import React,{useState} from 'react'
import { Helmet } from 'react-helmet'
import {auth} from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import Alert from '../elements/Alerts'

import {Header, Title, HeaderContainer} from '../elements/Header'
import Button from '../elements/Button'
import {Form, Input, ButtonContainer} from '../elements/FormElements'

import {ReactComponent as SvgSignUp} from '../images/sign-up.svg'
import styled from 'styled-components'
const Svg = styled(SvgSignUp)`
    width: 100%;
    max-height: 7.25rem;
    margin-bottom: 1.25rem;
`

const UserSignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [alertState, setAlertState] = useState(false)
    const [alert, setAlert] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAlertState(false)
        setAlert({})

        const regExp=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if(email === '' || password === '' || password2 === '') {
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Please fill all fields required'
            })
            // return
        }
        
        if(!regExp.test(email)){
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Please, enter a valid email'
            })
            // return
            }

        if(password !== '') {
            if(password !== password2) {
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Passwords do not match! Please, check passwords'
            })
            // return
            }
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setAlertState(true)
            setAlert({
                type: 'success',
                msg:'User registered'
            })
            setEmail('')
            setPassword('')
            setPassword2('')
            navigate('/')
        } catch (error) {
            setAlertState(true)

            let message
            switch(error.code){
                case 'auth/invalid-password':
                    message='password must have 6 characters'
                    break
                case 'auth/email-already-in-use':
                    message='email already exist'
                    break
                case 'auth/invalid.email':
                    message='email is invalid'
                    break
                default:
                    message='Error trying to create the account'
                    break
            }
            setAlert({type:'error', msg:message})
        }
    }

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'email':
                return setEmail(e.target.value)
            case 'password':
                return setPassword(e.target.value)
            case 'password2':
                return setPassword2(e.target.value)
            default:
                break
        }
    }

    return (
        <>
            <Helmet>
                <title>Create Account</title>
            </Helmet>
            <Header>
                <HeaderContainer>
                    <Title>Create Account</Title>
                    <div>
                        <Button to='/signin'>Sign-In</Button>
                    </div>

                </HeaderContainer>
            </Header>
            <Form onSubmit={handleSubmit}>
                <Svg/>
                <Input
                    type='text'
                    name='email'
                    placeholder='email'
                    value={email}
                    onChange={handleChange}
                    />
                <Input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={handleChange}
                    />
                <Input
                    type='password'
                    name='password2'
                    placeholder='repeat password'
                    value={password2}
                    onChange={handleChange}
                    />
                <ButtonContainer>
                    <Button as="button" primary type='submit'> Create Account</Button>
                </ButtonContainer>
            </Form>
            <Alert
                type={alert.type}
                msg={alert.msg}
                alertState={alertState}
                setAlertState={setAlertState}
            />
        </>
     )
}

export default UserSignIn;