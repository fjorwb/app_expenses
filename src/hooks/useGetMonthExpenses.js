import {useState, useEffect} from 'react'
import { db } from '../firebase/firebaseConfig';
import { endOfMonth, getUnixTime, startOfMonth } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';

const useGetMonthExpenses = () => {
    const {user} = useAuth()
    const [expenses, setExpenses] = useState([])

    
    

    useEffect(() => {
        const MonthStart = getUnixTime(startOfMonth(new Date()))
        const MonthEnd = getUnixTime(endOfMonth(new Date()))

        if(user) {
            const que = query(
                collection(db,'expenses'),
                orderBy('date','desc'),
                where('date','>=', MonthStart),
                where('date','<=', MonthEnd),
                where('userUID','==',user.uid)
            )

            const unsuscribe = onSnapshot(que, (snapshot) => {
                setExpenses(snapshot.docs.map((document) => {
                return {...document.data(), id:document.id}

            }))
        }, (error) => {console.log(error)})
        return unsuscribe
        }
    },[user])

    return expenses;
}
 
export default useGetMonthExpenses;