import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
class Shorttext extends Component{
    constructor(props){
        super();
        this.state={

        }
    }
    componentWillMount(){
    }

    handleShortChange(event) {
        this.props.question["question"] = event.currentTarget.value;

    }


    render(){
        return(
            <div className="pavan">
                    <form className="form-horizontal" >
                        <div className="form-group ">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <input onChange={ (e) => this.handleShortChange(e)} type="text" className="form-control" name="inputshortform"
                                       id="inputshortform" placeholder="Question Text"/>
                            </div>
                        </div>

                    </form>

                </div>






        );
    }


}


export default withRouter(Shorttext);