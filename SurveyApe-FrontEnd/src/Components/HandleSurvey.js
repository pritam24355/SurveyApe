import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as API from '../api/API';

class HandleSurvey extends Component{
    constructor(props){
        super();
        this.state={}
    }
    componentWillMount(){

        console.log(this.props.match.params.number);
        var url = this.props.match.params.number;
        var b = url.split(".");
        console.log("b last: ", b[b.length-1]);
        console.log("b: ",b);
        var sat = "";//ength -2]
        for(var i=1; i<b.length-2;i++)
            sat += b[i] + ".";
        sat += b[b.length-2]
        console.log("sat: ",sat);
        console.log(typeof(sat));
        var mailurl=sat;
        var newurl="";
        newurl+=b[b.length-1];
        console.log(mailurl);

        console.log(newurl);
        this.props.handleurlvalue(newurl,mailurl);

    }




    render(){
        return(
            <div className="pavan">
                <form className="form-horizontal" >
                    <div className="form-group ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                           <h1>Form is Loading</h1>
                        </div>
                    </div>

                </form>

            </div>






        );
    }


}


export default withRouter(HandleSurvey);