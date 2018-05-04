import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
class Date extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentWillMount(){
    }

    handleMultipleChange(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }


    render(){
        return(
            <div className="pavan">
                <form className="form-horizontal" >
                    <div className="form-group ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <input onChange={ (e) => this.handleMultipleChange(e)} type="date" className="form-control" name="inputmultiplequestion"
                                   id="date"/>



                        </div>
                    </div>

                </form>

            </div>






        );
    }


}


export default withRouter(Date);