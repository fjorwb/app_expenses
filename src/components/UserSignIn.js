import React,{useState} from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import {signInWithEmailAndPassword} from 'firebase/auth'

import {Header, Title, HeaderContainer} from '../elements/Header'
import Button from '../elements/Button'
import {Form, Input, ButtonContainer} from '../elements/FormElements'
import Alert from '../elements/Alerts'

import {ReactComponent as SvgLogin} from '../images/signin.svg'
import styled from 'styled-components'
const Svg = styled(SvgLogin)`
    width: 100%;
    height: 10rem;
`
const UserSignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertState, setAlertState] = useState(false)
    const [alert, setAlert] = useState({})

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            default:
                break
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAlertState(false)
        setAlert({})

        const regExp=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if(!regExp.test(email)){
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Please, enter a valid email'
            })
            return
        }

        if(email === '' || password === '') {
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Please fill all fields required'
            })
            return
        }
        
        if(password.length < 8) {
            setAlertState(true)
            setAlert({
                type:'error', 
                msg:'Invalid password! Must be at least 8 characters'
            })
            return
            }

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setAlertState(true)
            setAlert({
                type: 'success',
                msg:'User registered'
            })
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (error) {
            setAlertState(true)
            console.log(error);

            let message
            switch(error.code){
                case 'auth/wrong-password':
                    message='Wrong password! PLease, enter valid password'
                    break
                case 'auth/user-not-found':
                    message='Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
                    break
                case 'auth/too-many-requests':
                    message='Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
                    break
                default:
                    message='Error trying to sign-in'
                    break
            }
            setAlert({type:'error', msg:message})
        }
    }

    return ( 
        <>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <Header>
                <HeaderContainer>
                    <Title>Sign In</Title>
                    <div>
                        <Button to='/signup'>Sign-Up</Button>
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
                    onChange={(e) => handleChange(e)}
                    />
                <Input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => handleChange(e)}
                    />
                <ButtonContainer>
                    <Button as='button' primary type='submit'> Sign-In</Button>
                </ButtonContainer>
            </Form>
            <Alert
                type={alert.type}
                msg={alert.msg}
                alertState={alertState}
                setAlertState={setAlertState}
            />
        </>
        );
}

export default UserSignIn;