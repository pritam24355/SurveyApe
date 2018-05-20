import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link,withRouter} from "react-router-dom";

class OpenUniquelandingpage extends Component {
    constructor(props) {
        super(props);

    }
    handleChangeEmail(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    componentWillMount(){
        console.log("ala");
        console.log(this.props.match.params.number);
        var url=this.props.match.params.number;
        var surveyid=url.substring(11,url.length);
        console.log(url);
        //var surveyid=url.charAt(url.length-1);
        console.log(surveyid);
        this.props.handleSurveyId(surveyid);

    }


    render() {
        return(
        <div className="container">

            <div className="row">
                <div className="col-lg-12">
                    <div id="content">
                        <h1 class="surveyape">OpenUnique Survey</h1>


                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <input type="submit" name="registerusers" onChange={ (e) => this.handleChangeEmail(e)}/>             </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Link to="/login" className="btn btn-success loginbutton">Login</Link>

                </div>
                <div className="col-md-12">
                    <Link to="/register" className="btn btn-success loginbutton">Sign Up</Link>

                </div>

            </div>
        </div>
        );
    }
}
export default withRouter(OpenUniquelandingpage);