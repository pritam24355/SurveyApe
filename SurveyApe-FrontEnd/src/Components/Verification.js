import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class Verification extends Component {
    constructor(props) {

        super(props);
        this.state = {
        };

        this.handleChangeverification = this.handleChangeverification.bind(this);
        this.handleSubmitClickVerification = this.handleSubmitClickVerification.bind(this);
    }

    handleChangeverification(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }

    handleSubmitClickVerification(event) {

        console.log(this.state);

        var formData = new FormData();
        formData = this.state;
        this.props.handleSubmit(formData);
    }

    render(){

        return (
            <div className="container">
                <div className="row">
                    <form className="form-horizontal code" >
                        <div className="form-group ">
                            <h5>You must have received a code on your email</h5>
                            <h5>Please enter it here</h5>
                            <label className="col-lg-3">Code  </label>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <input onChange={ (e) => this.handleChangeverification(e)} type="number" className="form-control" name="code"
                                       id="code" placeholder="Code"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div
                                className="col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-4">
                                <button type="button"
                                        onClick={() => this.handleSubmitClickVerification()}
                                        className="btn btn-primary codebutton">Enter</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>



        );
    }
}

export default Verification;