import {useEffect, useState} from "react";
import db from "../../../config/firebase-config"
import { onSnapshot, collection } from "firebase/firestore"

const AddTable = () => {

    const [formData, setFormData] = useState([])


    useEffect(() => {
        onSnapshot(collection(db, "User"), (snapshot) =>{
            setFormData(snapshot.docs.map( (doc) => doc.data()))
        });
    }, [])

    return(

            formData.map((data) => (
                <tbody>
                    <tr>
                        <td >{data.winCon}</td>
                        <td >{data.title}</td>
                        <td >{data.email}</td>
                        <td >{data.timeLimit}</td>
                        <td >{data.pubLic}</td>
                    </tr>
                </tbody>
            ))


    )
}

export default AddTable