import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import * as API from '.././api/API';
import Navbar from './Navbar';
class ViewMySurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            received: false,
            unireceived:false,
            titlelist:[],
            uniquelist:[]
        }
    }

    componentWillMount() {
        console.log("in mount");
        //console.log(this.props.username);
        API.dogetMySurvey()
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
        this.props.handleurlvalue2(url);

    }
    render() {
        if (this.state.received) {
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

        }
// console.log(this.state.unireceived);




        return (

            <div>
                <Link to="/home" className="btn btn-success takesurvey">Home
                </Link>
                {this.state.titlelist || <div></div>}
            </div>

        );


    }
}


export default withRouter(ViewMySurvey);