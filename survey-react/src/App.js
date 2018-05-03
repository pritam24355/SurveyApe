import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, withRouter, Switch, Router,Redirect} from 'react-router-dom';
import './App.css';
import * as API from './api/API';
import Verification from './Components/Verification';

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





  render() {
    return (
        <Switch>
            <Route exact path="/register" component={()=> <Signup handleSubmit={this.handleSubmit}/>}/>
            <Route exact path="/login" component={()=><Login handleSubmit={this.handleSubmitLogin}/>}/>
            <Route exact path="/verification" component={()=> <Verification handleSubmit={this.handleVerification}/>}/>
        </Switch>






    );
  }
}

export default withRouter(App);
