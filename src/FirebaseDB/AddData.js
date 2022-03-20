import DataService from "./DataService";
import {Component} from "react";

class AddData extends Component{
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrivateKey = this.onChangePrivateKey.bind(this);
    }
}