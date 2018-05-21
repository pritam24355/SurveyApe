import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as API from '.././api/API';
import Navbar from './Navbar';
class DisplaySurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            received: false,
            titlelist:[]


        }
    }

    componentWillMount() {
        console.log("in mount");
        console.log(this.props.username);
        API.dogetSurveyTitle(this.props.username)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        res.json().then(data => {
                            console.log(data);
                            this.setState({
                                titledata: data,
                                received: true
                            });
                        })

                    } else if (res.status === 404) {
                        console.log("No survey found for you");
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })

    }
handleLink(event){
    event.preventDefault();
    var url = event.currentTarget.getAttribute("href");
    console.log(url);
   // var url2="http://18.217.64.116:3000/surveyform/.pritam.meher36@gmail.com.19"
    var b = url.split(".");
    console.log("b last: ", b[b.length-1]);
    console.log("b: ",b);
    var sat = "";//ength -2]
    for(var i=4; i<b.length-2;i++)
        sat += b[i] + ".";
    sat += b[b.length-2];
    console.log("sat: ",sat);
    console.log(typeof(sat));
    var mailurl=sat;
    var newurl="";
    newurl+=b[b.length-1];
    console.log(mailurl);

    console.log(newurl);
    this.props.handleurlvalue(newurl,mailurl);

}
    render() {
        if (this.state.received) {
            return(
    <div>
        <Link to="/home" className="btn btn-success takesurvey">Home
        </Link>
        {this.state.titlelist = Object.entries(this.state.titledata).map(([key, value]) => {
                return (

                    <div className="container">
                    <div className="row">
                        <h6>Survey Name:{key}</h6>
                        <a href={value} onClick={this.handleLink.bind(this)}>{value}</a>
                    </div>
                    </div>
                );
            })}

    </div>
        )
        }


        else {
            return (
                <div>

                    <Navbar handleLogout={this.props.handleLogout}/>
                </div>







            );


        }
    }
}


export default withRouter(DisplaySurvey);