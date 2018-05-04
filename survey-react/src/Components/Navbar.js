import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
class Navbar extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    handleProfile(event) {

    }
    handleLogout(event) {

    }


        render(){
        return(
            <div className="nav">
                <button className="btn navbaruser" onClick={this.handleProfile()} >Profile</button>
                <button className="btn-danger navbarlogout" onClick={this.handleLogout()} >Logout</button>
            </div>





        );
    }


}


export default withRouter(Navbar);