import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import * as API from '../api/API';
import Shorttext from './Options/Shorttext';
import Star from './Options/Star';
import YesNo from './Options/YesNo';

import Date from './Options/Date';
import MultipleChoice from './Options/MultipleChoice';

class DisplayForm extends Component{
    constructor(props){
        super(props);
        this.state={
            loading: true,
            title:"Survey1",
            answers: {}

        }
    }

    handleLogout(){
        API.doLogout()
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        alert("Successfully Logged out")
                        this.props.handlePageChange("/login");
                    } else if (res.status === 400) {
                        alert("Failed to Log out")

                        this.props.handlePageChange("/home");
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })

    }

    componentWillMount() {

        console.log(this.props.url1);
        //var i=this.props.url1;

        console.log(this.state);

        //debugger;
        this.handleSurveyQuestions(this.props.url1,this.props.mailurl);
    }

    handleAnswerChange(questionId, answer) {

        this.state.answers[questionId] = answer
    }

    handleSurveyQuestions =(userdata,mailurl)=> {
//        debugger;
        console.log(userdata);
        /*this.setState({
            title:userdata
        });*/
        let form={
            idof:userdata,
            mailurl:mailurl
        }
        console.log(form);
        API.dogetSurveyQuestions(form)
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
                            message: "Wrong Code. Try again..!!"
                        });
                    }
                    else if (res.status === 401) {
                        alert("Survey expired")

                        this.setState({
                            message: "Wrong Code. Try again..!!"
                        });
                    }
                    else if(res.status === 226) {
                        alert("Form already submitted")

                        this.setState({
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
        console.log(this.state.answers);
        API.doSubmitAnswers(this.state.answers)
            .then((res) => {
                console.log(res.status);
                if (res.status === 200) {

                    this.props.history.push("/home")

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
        this.props.history.push("/home");
    }

    render(){
        if(this.state.loading) {
            return <p>Form is loading</p>
        }
            return(
                <div>
                <Navbar handleLogout={this.props.handleLogout} handlePageChange={this.props.handlePageChange}/>
                <div className="container">

                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-lg-4">
                            <form className="form-horizontal" onSubmit={this.submitSurvey.bind(this)}>
                                {

                                    this.state.questions.map((question) => {
                                        switch(question.questionType) {

                                            case "ST":
                                                return <Shorttext question={question} answerMode={true} onAnswer={this.handleAnswerChange.bind(this)}/>
                                            case "MC":
                                                return <MultipleChoice question={question} answerMode={true} onAnswer={this.handleAnswerChange.bind(this)}/>
                                            case "DATE":
                                                return <Date question={question} answerMode={true} onAnswer={this.handleAnswerChange.bind(this)}/>

                                            case "STAR":
                                                return <Star question={question} answerMode={true} onAnswer={this.handleAnswerChange.bind(this)}/>

                                            case "BOOL":
                                                return <YesNo question={question} answerMode={true} onAnswer={this.handleAnswerChange.bind(this)}/>

                                        }
                                    })
                                }



                                <input type="submit" />



                            </form>

                        </div>
                    </div>


                </div>


                </div>




            );
    }


}


export default withRouter(DisplayForm);