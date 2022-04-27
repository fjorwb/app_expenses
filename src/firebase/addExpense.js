import {db} from './firebaseConfig'
import { collection, addDoc } from "firebase/firestore";

const addExpense = async ({userUID, category, description, amount, date}) => {
    await addDoc(collection(db,'expenses'), {
        userUID: userUID,
        date: date,
        category: category,
        description: description,
        amount: Number(amount),
    })
}

export default addExpense


