import React from 'react'
import {ReactComponent as IconLogOut} from '../images/log-out.svg'
import {auth} from '../firebase/firebaseConfig'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Button from '../elements/Button';


const LogOutBtn = () => {
    const navigate = useNavigate()

    const CloseSession = async () => {
        try {
            await signOut(auth)
            navigate('/signin')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button BigIcon as="button" onClick={CloseSession}>
            <IconLogOut/>
        </Button>
    );
}

export default LogOutBtn