import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, withRouter, Switch, Router} from 'react-router-dom';
import './App.css';
import * as API from './api/API';

import Signup from './Components/Signup';
import Login from './Components/Login';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: ''
        };
    }
handleSubmit=(userdata) => {
    API.doRegister(userdata)
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    ...this.state,
                    isLoggedIn: true
                });
                console.log("cookies: " + this.getCookie('aaj'));
                this.props.history.push("/login");
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
                 if (res.status === 200) {
                     res.json().then(data => {
                         console.log("data received");
                         console.log(data);
                         this.setState({
                             ...this.state,
                             isLoggedIn: true,
                             username: data.userEmail
                         });
                     });
                     console.log(this.state);
                     let x = document.cookie;
                     console.log("username from session storage: " + this.getCookie('aaj'));
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








  render() {
    return (
        <Switch>
            <Route exact path="/" component={()=> <Signup handleSubmit={this.handleSubmit}/>}/>
            <Route exact path="/login" component={()=><Login handleSubmit={this.handleSubmitLogin}/>}/>
        </Switch>






    );
  }
}

export default withRouter(App);
