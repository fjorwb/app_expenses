import {useState, useEffect} from 'react'
import { db } from '../firebase/firebaseConfig'
import { useAuth } from '../context/AuthContext'
import { collection, query, orderBy, where, limit, onSnapshot, startAfter } from 'firebase/firestore'

const useGetExpenses = () => {
    const {user} = useAuth()
    const [expenses, setExpenses] = useState([])
    const [lastExpense, setLastExpense] = useState(null)
    const [moreToCharge, setMoreToCharge] = useState(false)

    const getMoreExpenses = () => {
        const que = query(
        collection(db, 'expenses'),
        where('userUID', '==', user.uid),
        orderBy('date','desc'),
        limit(5),
        startAfter(lastExpense)
        )
        
        onSnapshot(que,(snapshot) => {
            if(snapshot.docs.length > 0){
                    setLastExpense(snapshot.docs[snapshot.docs.length-1])

                setExpenses(expenses.concat(snapshot.docs.map((expense) => {
                        return {...expense.data(), id:expense.id}
                    })))
                } else {
                    setMoreToCharge(false)
                }
            },error => {console.log(error)})
    }

    useEffect(() => {
        const que = query(
            collection(db, 'expenses'),
            where('userUID', '==', user.uid),
            orderBy('date','desc'),
            limit(5)
        )
        const unsuscribe = onSnapshot(que, (snapshot) => {
                if(snapshot.docs.length > 0) {
                    setLastExpense(snapshot.docs[snapshot.docs.length-1])
                    setMoreToCharge(true)
                } else {
                    setMoreToCharge(false)
                }
                setExpenses(snapshot.docs.map((expense) => {
                    return{...expense.data(), id:expense.id}
                }))
            })
            return unsuscribe
    },[user])

    return [expenses, getMoreExpenses, moreToCharge];
}

export default useGetExpenses;

