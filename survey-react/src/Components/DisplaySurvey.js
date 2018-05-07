import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as API from '.././api/API';
import Navbar from './Navbar';
class DisplaySurvey extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }


componentWillMount(){
        API.dogetSurveyTitle(this.props.username)
        .then((res) => {
                console.log(res.status);
                if (res.status === 200) {
                    res.json().then(data=>{
                        console.log(data.toString());
                    })

                } else if (res.status === 404) {
                    console.log("No survey found for you");
                }
            }
        )
        .catch((err) => {
            console.log(err);
        })

}

    render(){
        return(
            <div className="row">
                <Navbar/>


            </div>





        );
    }


}


export default withRouter(Navbar);