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
            <div className="row">
                <div className="col-md-6 col-lg-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">Enter Your Code here</div><br/>
                        <div className="panel-body">
                            <form className="form-horizontal" >
                                <div className="form-group ">
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
                                                className="btn btn-primary">Enter</button>
                                    </div>
                                </div>
                            </form>

                            {/*<div className="row col-offset-2">*/}
                            {/*<div className="panel panel-default">*/}
                            {/*<span className="text text-danger">Invalid username / password</span>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Verification;