import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as API from '.././api/API';
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
title:"Survey1"
        }
        this.handleProfile=this.handleProfile.bind(this);
    }
    handleProfile() {
        this.props.handleSurveyQuestions(this.state);


    }
    handleLogout() {
        this.props.handleLogout();
    }




        render(){
        return(


            <div>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                SurveyApe
                </a>
            <a className="nav navbar-right">
                {/*<button className="btn navbaruser pull-right" onClick={this.handleProfile} >Profile</button>*/}
                <button className="btn-danger navbarlogout pull-right" onClick={this.handleLogout.bind(this)} >Logout</button>

            </a>
            </nav>
            </div>




        );
    }


}


export default withRouter(Navbar);