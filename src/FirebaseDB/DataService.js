import { app } from "../../config/firebase-config";
import firebase from "firebase/compat";

const dataFireBase = firebase.ref("/userLobby");

class DataService {
    getAll(){
        return dataFireBase;
    }

    create(tableData){
        return dataFireBase.push(tableData);
    }

    update(key, value){
        return dataFireBase.child(key).update(value)
    }

    delete(key){
        return dataFireBase.child(key).remove();
    }

}

export default new DataService();