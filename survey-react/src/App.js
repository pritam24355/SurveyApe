import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, withRouter, Switch, Router,Redirect} from 'react-router-dom';
import './App.css';
import * as API from './api/API';
import Verification from './Components/Verification';
import Home from './Components/Home';
import Form from './Components/Form';
import DisplayForm from './Components/DisplayForm';

import Signup from './Components/Signup';
import Login from './Components/Login';
import DisplaySurvey from './Components/DisplaySurvey';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: ''
        };
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
                            this.props.history.push("/login")
                        }
                    }
                )
                .catch((err) => {
                    console.log(err);
                })


        }





handleSubmit=(userdata) => {
    API.doRegister(userdata)
        .then((res) => {
            if (res.status === 201) {
                this.setState({
                    ...this.state,
                    isLoggedIn: true
                });
                this.props.history.push("/verification");
            } else if (res.status === 400) {
                this.props.history.push("/");
                this.setState({
                    ...this.state,
                    isLoggedIn: false,
                    message: "Error with input. Please Try again..!!"
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
};


 handleSubmitLogin=(userdata)=> {
     API.doLogin(userdata)

         .then((res) => {
             console.log(res.status);
             if (res.status === 200) {
                 console.log("********");
                 res.json().then(data => {
                     console.log("data received");
                     console.log(data.email);
                     console.log(this.state);
                     this.setState({
                         ...this.state,
                         isLoggedIn: true,
                         username: data.email
                     });
                     console.log(this.state);
                 });

                 this.props.history.push("/home");
             } else if (res.status === 400) {
                     this.setState({
                         isLoggedIn: false,
                         message: "Wrong username or password. Try again..!!"
                     });
                 }
             }

         )
         .catch((err) => {
             console.log(err);
         })
 };

    handleVerification=(userdata)=>{
    API.doVerify(userdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log("********");
                        res.json().then(data => {
                            console.log("data received");
                            console.log(data.email);
                            console.log(this.state);
                            this.setState({
                                ...this.state,
                                isLoggedIn: true,
                                username: data.email
                            });
                            console.log(this.state);
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
};

    handleSubmitSurvey =(userdata)=>{
        API.doSubmitSurvey(userdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
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
    handlePageChange = ((page) => {
        this.props.history.push(page);
    });


    /*handleSurveyQuestions=(userdata)=>{

        API.dogetSurveyQuestions(userdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log("********");
                        res.json().then(data => {
                            console.log("data received");
                            console.log(data.email);
                            console.log(this.state);
                            this.setState({
                                ...this.state,
                                isLoggedIn: true,
                                username: data.email
                            });
                            console.log(this.state);
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





    }*/



  render() {
    return (
        <Switch>
            <Route exact path="/register" component={()=> <Signup handleSubmit={this.handleSubmit}/>}/>
            <Route exact path="/login" component={()=><Login handlePageChange={this.handlePageChange}isLoggedIn={this.state.isLoggedIn} username={this.state.username} handleSubmit={this.handleSubmitLogin}/>}/>
            <Route exact path="/verification" component={()=> <Verification handleSubmit={this.handleVerification}/>}/>
            <Route exact path="/home" component={()=> <Home handlePageChange={this.handlePageChange} isLoggedIn={this.state.isLoggedIn} username={this.state.username} />}/>
            <Route exact path="/createsurvey" component={()=> <Form handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/takesurvey" component={()=> <DisplayForm handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/listsurvey" component={()=> <DisplaySurvey handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>


        </Switch>






    );
  }
}

export default withRouter(App);
