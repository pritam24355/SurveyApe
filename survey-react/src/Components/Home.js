import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import * as API from '../api/API';


class Home extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentWillMount(){
        console.log(this.props.username);
        console.log(this.props.isLoggedIn);
    }

    handleSurveyQuestions=(userdata)=>{

        API.dogetSurveyQuestions(userdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log("********");
                        res.json().then(data => {

                            console.log(data);
                        });

                        this.props.history.push("/home");
                    } else if (res.status === 400) {
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong Code. Try again..!!"
                        });
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })





    }



    render(){
        return(
            <div className="container">
                <Navbar handleSurveyQuestions={this.handleSurveyQuestions.bind(this)}/>
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