import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, withRouter, Switch,Link, Router,Redirect} from 'react-router-dom';
import './App.css';
import * as API from './api/API';
import Verification from './Components/Verification';
import Home from './Components/Home';
import Form from './Components/Form';
import DisplayForm from './Components/DisplayForm';
import HandleSurvey from './Components/HandleSurvey';
import Opensurveyform from './Components/Opensurveyform';
import OpenUniquelandingpage from './Components/OpenUniquelandingpage';
import Navbar from './Components/Navbar';
import OpenSurvey from './Components/OpenSurvey';
import NewUnique from './Components/NewUnique';
import InsertAttendee from './Components/InsertAttendee';
import ViewMySurvey from './Components/ViewMySurvey';
import EditSurvey from './Components/EditSurvey';

import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "./Components/alertConfig";

import Signup from './Components/Signup';
import Login from './Components/Login';
import DisplaySurvey from './Components/DisplaySurvey';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: '',
            url:'',
            surveyId:''
        };
    }


    componentWillMount() {
    }




handleSubmit=(userdata)=>  {
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
                alert(res.status);
            }
            else if (res.status === 500) {
                this.setState({
                    ...this.state,
                    isLoggedIn: false,
                    message: "Error with input. Please Try again..!!"
                });
                alert("Failed to signup");
            }
        })
        .catch((err) => {
            console.log(err);
        })
}


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
                     alert("Successful Login")
                     console.log(this.state);
                 });

                 this.props.history.push("/home");
             } else if (res.status === 400) {
                     this.setState({
                         isLoggedIn: false,
                         message: "Wrong username or password. Try again..!!"
                     });
                     alert("wrong username or password")
                 }
             else if (res.status === 500) {
                 this.setState({
                     isLoggedIn: false,
                     message: "Wrong username or password. Try again..!!"
                 });
                 alert("wrong username or password")
             }
             }

         )
         .catch((err) => {
             console.log(err);
         })
 }

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
                            alert("Email Verified Successfully")
                            console.log(this.state);
                        });

                        this.props.history.push("/home");
                    } else if (res.status === 400) {
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong Code. Try again..!!"
                        });
                        alert("Wrong code")

                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })
}

    handleSubmitSurvey=(userdata)=>{
        API.doSubmitSurvey(userdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        alert("Survey Submitted successfully")

                        this.props.history.push("/login");
                    } else if (res.status === 500) {
                        alert("Survey Failed to Submit:Title and Unique Survey? are required field ")

                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })

}
    handleurlvalue2(url){
        this.setState({
            ...this.state,
            url:url
        });
        this.props.history.push("/editsurvey");

    }

    handleurlvalue(url,mailurl){
        console.log("ala re")
        this.setState({
            ...this.state,
            url: url,
            mailurl:mailurl
        });
        this.props.history.push("/takesurvey");
    }
    handleSurveyId(surveyid){
        this.setState({
            ...this.state,
            surveyId:surveyid
        });
        this.props.history.push("/newunique");
    }
    handleurlvalue1(url,mailurl){
        console.log("ala re")
        this.setState({
            ...this.state,
            url: url,
            mailurl:mailurl
        });
        this.props.history.push("/listopensurvey/takesurvey");
    }


    handlePageChange(page) {
        this.props.history.push(page);
    }

    handleLogout(){
        API.doLogout()
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong Code. Try again..!!",
                            surveyId:""
                        });
                        alert("Logged out Successfully");
                        this.props.history.push("/login");
                    } else if (res.status === 400) {
                        alert("Error in logging out");

                        this.props.history.push("/home")
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })

    }

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
    <div>

        <Switch>
            <Route exact path="/register" component={()=> <Signup surveyId={this.state.surveyId} handleSubmit={this.handleSubmit}/>}/>
            <Route exact path="/login" component={()=><Login handlePageChange={this.handlePageChange.bind(this)} surveyId={this.state.surveyId} isLoggedIn={this.state.isLoggedIn} username={this.state.username} handleSubmit={this.handleSubmitLogin}/>}/>
            <Route exact path="/verification" component={()=> <Verification surveyId={this.state.surveyId} handleSubmit={this.handleVerification}/>}/>
            <Route exact path="/home" component={()=> <Home surveyId={this.state.surveyId} handleLogout={this.handleLogout.bind(this)}handlePageChange={this.handlePageChange.bind(this)} isLoggedIn={this.state.isLoggedIn} username={this.state.username} />}/>
            <Route exact path="/createsurvey" component={()=> <Form handleLogout={this.handleLogout.bind(this)}handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/takesurvey" component={()=> <DisplayForm handleLogout={this.handleLogout.bind(this)} mailurl={this.state.mailurl} url1={this.state.url} handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/listsurvey" component={()=> <DisplaySurvey handleLogout={this.handleLogout.bind(this)} handleurlvalue={this.handleurlvalue.bind(this)}handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route path="/surveyform/:number" component={()=> <HandleSurvey  handleLogout={this.handleLogout.bind(this)} handleurlvalue={this.handleurlvalue.bind(this)}handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>

            <Route exact path="/listopensurvey" component={()=> <OpenSurvey handleLogout={this.handleLogout.bind(this)} handleurlvalue={this.handleurlvalue1.bind(this)}handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/listopensurvey/takesurvey" component={()=> <Opensurveyform mailurl={this.state.mailurl} url1={this.state.url} handleurlvalue={this.handleurlvalue1.bind(this)}handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} />}/>


            <Route  path="/opensurvey/:number" component={()=> <OpenUniquelandingpage  handleSurveyId={this.handleSurveyId.bind(this)} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>

            <Route exact path="/newunique" component={()=> <NewUnique surveyId={this.state.surveyId} handleLogout={this.handleLogout.bind(this)} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/openuniqueinsert" component={()=> <InsertAttendee surveyId={this.state.surveyId} handleLogout={this.handleLogout.bind(this)} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/viewmysurvey" component={()=> <ViewMySurvey handleLogout={this.handleLogout.bind(this)} handleurlvalue2={this.handleurlvalue2.bind(this)}handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>
            <Route exact path="/editsurvey" component={()=> <EditSurvey handleLogout={this.handleLogout.bind(this)} url1={this.state.url} handlePageChange={this.handlePageChange} handleSubmitSurvey={this.handleSubmitSurvey} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>}/>





            <div className="container">

                <div className="row">
                    <div className="col-lg-12">
                        <div id="content">
                            <h1 class="surveyape">SurveyApe</h1>


                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">

                        <Link to="/listopensurvey" className="btn btn-success takesurveybutton">Take Open Survey</Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Link to="/login" className="btn btn-success loginbutton">Login</Link>

                    </div>

                </div>
                </div>

        </Switch>

            </div>





    );
  }
}

export default withRouter(App);
