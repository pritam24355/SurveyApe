import React, {Component} from 'react';
import {Link,Redirect,} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
/*import AlertContainer from 'react-alert';
import {alertOptions, showAlert} from "./alertConfig";*/

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            firstName:"",
            lastName:"",

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }


    handleChange(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmitClick(event) {


        console.log(this.state);

        if (this.state.email == "") {
            console.log(this);
            alert("Enter email");



        }

        if (this.state.password === "") {
            console.log(this);

            alert("Enter password");

        }

        if (this.state.firstName === "") {
            console.log(this);

            alert("Enter firstname");

        }

        if (this.state.lastName === "") {
            console.log(this);

            alert("Enter lastname");

        }

        var formData = new FormData();
        formData = this.state;
        this.props.handleSubmit(formData);
    }

    render(){

        return (
            <div className ="row">

                <div className="col-sm-offset-4 col-md-offset-4 col-lg-offset-4 col-sm-6 col-md-6">
                    <div className="panel panel-default">
                        <div className="panel panel-body">
                            <ul id="dTab" className="nav nav-tabs">
                                <li><Link to='/login'><span className="glyphicon glyphicon-circle-arrow-right"></span>Login</Link></li>
                            </ul>
                            <div id="pane1" className="tab-pane">
                                <form className="form-group">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="control-label" >UserName</label>
                                            <input onChange={ (e) => this.handleChange(e)} type="email" id="email" required={true} name="email" placeholder="Enter your email id" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Password</label>
                                            <input onChange={ (e) => this.handleChange(e)} type="password" required={true} id="password" name="password" placeholder="Enter Password" className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label" >First Name</label>
                                            <input onChange={ (e) => this.handleChange(e)} type="text" id="firstName" required={true} name="firstName" placeholder="Enter First Name" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label" >Last Name</label>
                                            <input onChange={ (e) => this.handleChange(e)} type="text" required={true} id="lastName" name="lastName" placeholder="Enter Last Name" className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label" required={true} >Role</label><br/>
                                            <input onChange={ (e) => this.handleChange(e)} type="radio" id="role"
                                                   name="role" value="surveyor"/>
                                            <label className="control-label" >Surveyor</label>
                                            <input onChange={ (e) => this.handleChange(e)} type="radio" id="role"
                                                   name="role" value="surveyee"/>
                                            <label className="control-label" >Surveyee</label>
                                            <input onChange={ (e) => this.handleChange(e)} type="radio" id="role"
                                                   name="role" value="both"/>
                                            <label className="control-label" >Both</label>

                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.handleSubmitClick()}>
                                            Submit
                                        </button>
                                    </fieldset>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;