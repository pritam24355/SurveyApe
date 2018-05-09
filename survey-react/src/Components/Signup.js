import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FormErrors } from './FormErrors';
import Navbar from './Navbar';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
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



    render(){

        return (
            <div>


                <div className="container">
                    <div>
                        <div>
                            <div className="panel panel-default">
                                <div className="panel panel-body registerform">

                                    <div id="pane1" className="tab-pane">
                                        <label className="loginlabel">Register</label>
                                        <form className="text-justify">
                                            <fieldset>
                                                <div>
                                                    <FormErrors formErrors={this.state.formErrors} />
                                                </div>

                                                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>


                                                    <label className="control-label" >UserName</label>
                                                    <input

                                                        type="email"
                                                        required
                                                        id="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={this.state.email}
                                                        onChange={ (e) => this.handleChange(e)}


                                                        className="form-control"/>
                                                </div>
                                                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                                    <label className="control-label">Password</label>
                                                    <input
                                                        onChange={ (e) => this.handleChange(e)}
                                                        type="password"
                                                        value={this.state.password}
                                                        id="password"
                                                        name="password"
                                                        placeholder="Enter Password"
                                                        className="form-control"/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" >First Name</label>
                                                    <input onChange={ (e) => this.handleChange(e)} type="text" id="firstName" required name="firstName" placeholder="Enter First Name" className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label" >Last Name</label>
                                                    <input onChange={ (e) => this.handleChange(e)} type="text" required id="lastName" name="lastName" placeholder="Enter Last Name" className="form-control"/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" >Role</label><br/>


                                                    <input  onChange={ (e) => this.handleChange(e)} type="radio" id="role"
                                                           name="role" value="surveyor"/>
                                                    <label className="control-label" >Surveyor</label>
                                                    <input className="radio" onChange={ (e) => this.handleChange(e)} type="radio" id="role"
                                                           name="role" value="surveyee"/>
                                                    <label className="control-label" >Surveyee</label>
                                                    <input className="radio" onChange={ (e) => this.handleChange(e)} type="radio" id="role"

                                                           name="role" value="both"/>
                                                    <label className="control-label" >Both</label>

                                                </div>
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    disabled={!this.state.formValid}
                                                    onClick={() => this.handleSubmitClick()}>

                                                    Sign Up
                                                </button>
                                                <a href="/login"
                                                    className="btn btn-primary signinbtn"

                                                 >
                                                    Sign In
                                                </a>
                                            </fieldset>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);