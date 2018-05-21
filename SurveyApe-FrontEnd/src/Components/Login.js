import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link,withRouter} from "react-router-dom";
import * as API from '../api/API';

import Navbar from './Navbar';
import { FormErrors } from './FormErrors';

class Login extends Component {
    constructor(props) {

        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'inputUsername':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'inputPassword':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }




    handleSubmitClick(event) {

        console.log(this.state);

        var formData = new FormData();
        formData = this.state;
        this.props.handleSubmit(formData);
    }
    componentWillMount(){
        if (this.props.isLoggedIn){
            this.props.handlePageChange("/home");
        }
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
                            this.props.history.push("/home")
                        });


                    } else if (res.status === 404) {


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


        console.log(this.props.username);


    }

    render(){

        return (
            <div>

                <div className="container">

                <div>
                    <div className="panel panel-primary loginpage">
                        <label className="loginlabel">Login</label>
                        <div className="panel-body ">
                            <form className="form-horizontal" >
                                <div className="form-group ">
                                    <div>
                                        <FormErrors formErrors={this.state.formErrors} />

                                    </div>
                                    <label className="col-lg-3">Username  </label>

                                    <div className="col-sm-8 col-md-8 col-lg-8 {`form-group ${this.errorClass(this.state.formErrors.email)}`} loginemailinput">
                                        <input
                                            onChange={ (e) => this.handleChange(e)}
                                            type="email"
                                            value={this.state.inputUsername}
                                            className="form-control"
                                            name="inputUsername"
                                            id="inputUsername"
                                            placeholder="Email Id"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 col-md-3 col-lg-3" >Password  </label>
                                    <div className="col-sm-8 col-md-8 col-lg-8 {`form-group ${this.errorClass(this.state.formErrors.password)}`}">
                                        <input
                                            onChange={ (e) => this.handleChange(e)}
                                            type="password"
                                            className="form-control"
                                            name="inputPassword"
                                            value={this.state.inputPassword}
                                            id="inputPassword"
                                            placeholder="Password"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div
                                        className="col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-4">
                                        <button type="button"
                                                disabled={!this.state.formValid}
                                                onClick={() => this.handleSubmitClick()}
                                                className="btn btn-primary">Sign in</button>
                                    </div>
                                </div>
                            </form>
                            <div className="row-fluid">
                                <Link to='/register'><span className="glyphicon glyphicon-circle-arrow-right"></span>New user?Sign Up</Link>
                            </div>
                            <div className="row-fluid">
                                <Link to='/'><span className="glyphicon glyphicon-circle-arrow-right"></span>Back</Link>
                            </div>

                            {/*<div className="row col-offset-2">*/}
                            {/*<div className="panel panel-default">*/}
                            {/*<span className="text text-danger">Invalid username / password</span>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>

                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default withRouter(Login);