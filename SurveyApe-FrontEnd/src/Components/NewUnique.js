import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link,withRouter} from "react-router-dom";
import * as API from '../api/API';

class NewUnique extends Component {
    constructor(props) {
        super(props);

    }
    handleFormChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmitClick(){
        let formdata={
            inputemail:this.state.inputemail,
            surveyId:this.props.surveyId
        }
        API.dosendmail(formdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {


                    } else if (res.status === 404) {
                        console.log("No survey found for you");
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })
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
                <form className="form-horizontal" >

                <div className="row">
                    <div className="row"><label>Register for the survey</label>
                        <input  onChange={(e) => this.handleFormChange(e)} type="text" className="form-control" name="inputemail"
                                id="inputemail" placeholder="Enter emaiil to register"/>
                    </div>
                </div>
                   <div className="row"> <button type="button"
                            onClick={() => this.handleSubmitClick()}
                            className="btn btn-primary">Submit</button>
            </div>

                </form>
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/login" className="btn btn-success loginbutton">Login</Link>

                    </div>
                    <div className="col-md-12">
                        <Link to="/register" className="btn btn-success loginbutton">Sign Up</Link>

                    </div>
                    <div className="col-md-12">
                        <Link to="/" className="btn btn-success loginbutton">Home</Link>

                    </div>

                </div>
            </div>
        );
    }
}
export default withRouter(NewUnique);