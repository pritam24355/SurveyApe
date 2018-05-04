import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

class Home extends Component{
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div className="container">
                <Navbar/>
                <div className="row">
                <div className="col-md-4 col-sm-4 col-lg-4">
                    <Link to="/createsurvey" className="btn btn-success">Create Survey</Link>
                </div>
                    <div className="col-md-4 col-sm-4 col-lg-4">

                    <Link to="/takesurvey" className="btn btn-success">Take Survey</Link>
                    </div>
                </div>
            </div>










        );
    }


}


export default withRouter(Home);