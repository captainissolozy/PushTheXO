import {useEffect, useState} from "react";
import db from "../../../config/firebase-config"
import {onSnapshot, collection, doc, getDoc} from "firebase/firestore"
import {useNavigate} from "react-router-dom";



const AddTable = () => {

    const [formData, setFormData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        onSnapshot(collection(db, "User"), (snapshot) => {
            setFormData(snapshot.docs.map((doc) => doc.data()))
        });
    }, [])

    const handleJoinPublic = async (id, boo) => {
        if (boo === "yes") {
            sessionStorage.setItem('gameKey', id)
            const docRef1 = doc(db, "Game", id);
            const docSnap = await getDoc(docRef1);
            if (docSnap.exists()) {
                navigate('/game')
            }
        }
    }

    return (

        formData.map((data) => (

                <tbody>
                <tr onClick={() => handleJoinPublic(data.UniqueKey, data.pubLic)} style={{cursor: "pointer"}}>
                    <td>{data.winCon}</td>
                    <td>{data.title}</td>
                    <td>{data.email}</td>
                    <td>{data.pubLic}</td>

                </tr>
                </tbody>

        ))


    )
}

export default AddTable