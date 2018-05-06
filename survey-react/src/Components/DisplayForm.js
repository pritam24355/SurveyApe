import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import * as API from '../api/API';
import Shorttext from './Options/Shorttext';

class DisplayForm extends Component{
    constructor(){
        super();
        this.state={
            loading: true,
            title:"Survey1",
            answers: {}

        }
    }

    componentWillMount() {
        this.handleSurveyQuestions(this.state);
    }

    handleAnswerChange(questionId, answer) {
        this.state.answers[questionId] = answer
    }

    handleSurveyQuestions(userdata) {

        API.dogetSurveyQuestions(userdata)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log("********");
                        res.json().then(data => {

                            console.log(data);
                            this.setState({
                                loading: false,
                                questions: data
                            });
                        });

                    } else if (res.status === 400) {
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong Code. Try again..!!"
                        });
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })


    }

    submitSurvey() {
    }

    render(){
        if(this.state.loading) {
            return <p>Form is loading</p>
        }
            return(
                <div className="container">
                    <Navbar/>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-lg-4">
                            <label className="col-lg-3">{this.state.title}</label>
                            <form className="form-horizontal" onSubmit={this.submitSurvey.bind(this)}>
                                {
                                    this.state.questions.map((question) => {
                                        switch(question.questionType) {
                                            case "ST":
                                                return <Shorttext question={question} answerMode={true} onAnswer={this.handleAnswerChange.bind(this)}/>
                                        }
                                    })
                                }



                                <input type="submit" />



                            </form>









                        </div>
                    </div>





                </div>




            );
    }


}


export default withRouter(DisplayForm);