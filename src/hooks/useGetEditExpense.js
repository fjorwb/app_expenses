import {useState, useEffect} from 'react'
import {db} from '../firebase/firebaseConfig'
import {doc, getDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'


const useGetEditExpense = (id) => {
    const [expense, setExpense] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getDocument = async () => {
            const document = await getDoc(doc(db, 'expenses', id))

            if(document.exists) {
                setExpense(document)
            } else {
                navigate('/expenseslist')
            }
        }
        
        getDocument(id)
        
    },[navigate, id])
    

    return [expense]
}

export default useGetEditExpense