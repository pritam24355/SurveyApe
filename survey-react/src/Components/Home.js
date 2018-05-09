import React, {Component} from 'react';

import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import * as API from '../api/API';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount(){

        API.doCheckSession()
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log("***sessioncheck");
                        res.json().then(email => {
                            console.log("session received");
                            console.log(email);
                            this.setState({
                                ...this.state,
                                isLoggedIn: true,
                                username: email.email
                            });
                        });


                    } else if (res.status === 404) {


                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong username or password. Try again..!!"
                        });
                        this.props.history.push("/")
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })













    /*console.log(this.props.username);
    console.log(this.props.isLoggedIn);*/
       // if(!this.props.isLoggedIn){
         //   this.props.history.push("/login")
        }


 handleLogout(){
        API.doLogout()
.then((res) => {
    console.log(res.status);
    if (res.status === 200) {
    this.props.handlePageChange("/login");
} else if (res.status === 400) {
    this.props.handlePageChange("/home");
}
}
)
.catch((err) => {
    console.log(err);
})

}
    handlePageChange = ((page) => {
        this.props.history.push(page);
    });


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
            <div>
                <Navbar handleLogout={this.props.handleLogout} handleSurveyQuestions={this.handleSurveyQuestions.bind(this)} handlePageChange={this.handlePageChange}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/createsurvey" className="btn btn-success createsurveybutton">Create Survey</Link>
                        </div>
                        <div className="col-md-6">

                            <Link to="/listsurvey" className="btn btn-success takesurvey">Take Survey</Link>
                        </div>
                    </div>
                </div>




            </div>








        );
    }


}


export default withRouter(Home);