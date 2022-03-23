import DataService from "./DataService";
import {useState} from "react";
import dataService from "./DataService";

const AddData = (props) => {
    const initialState = {
        Title: "",
        PrivateKey:"",
        email:"",
        highScore:0,
        winCon:0
    }

    const [data, setData] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value});
    };

    const saveData = () => {
      const dataIn = {
          Title: data.Title,
          PrivateKey: data.PrivateKey,
          email: data.email,
          highScore: data.highScore,
          winCon: data.winCon
      };
        dataService.create(dataIn).then(() =>{
            setSubmitted(true);
        }).catch(e =>{
            console.log(e)
        });
    }

    const newData = () => {
        setData(initialState);
        setSubmitted(false);
    };


}

export default AddData