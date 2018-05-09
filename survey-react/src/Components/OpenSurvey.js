import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as API from '.././api/API';
import Navbar from './Navbar';
class OpenSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            received: false,
            titlelist:[]


        }
    }

    componentWillMount() {
        console.log("in mount");
        //console.log(this.props.username);
        API.dogetOpenSurvey()
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
    handleLink1(event){
        event.preventDefault();
        var url = event.currentTarget.getAttribute("href");
        console.log(url);
        var mailurl=url.substring(34,url.length-2);
        console.log(mailurl);

        var newurl=url.charAt(url.length-1);
        console.log(newurl);
        this.props.handleurlvalue(newurl,mailurl);

    }
    render() {
        if (this.state.received) {
            return(
                this.state.titlelist = Object.entries(this.state.titledata).map(([key, value]) => {
                    return (

                        <div className="container">
                            <div className="row">
                                <h6>Survey Name:{key}</h6>
                                <a href={value} onClick={this.handleLink1.bind(this)}>{value}</a>
                            </div>
                        </div>
                    );
                })
            )
        }


        else {
            return (

                <div className="container">
                    <Navbar handleLogout={this.props.handleLogout}/>

                </div>





            );


        }
    }
}


export default withRouter(OpenSurvey);