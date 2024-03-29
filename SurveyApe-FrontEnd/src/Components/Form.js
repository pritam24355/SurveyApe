import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Shorttext from './Options/Shorttext';
import MultipleChoice from './Options/MultipleChoice';
import Date from './Options/Date';
import Panel from './Options/Panel'
import Navbar from './Navbar';
import * as API from '../api/API';
import Star from './Options/Star';
import YesNo from './Options/YesNo';

class Form extends Component{
    constructor(props){
        super();
        this.state={
            questionsarray:[],
            AddQuestionFlag:false,
            Title:"",
            inputemail:"",
            closed:false

        }
    }
    componentWillMount(){
        API.doCheckSession()
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        console.log("***sessioncheck");
                        res.json().then(email => {
                            console.log("session received");
                            console.log(email);
                            this.setState({
                                ...this.state,
                                isLoggedIn: true,
                                username: email.email
                            });
                        });


                    } else if (res.status === 404) {


                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong username or password. Try again..!!"
                        });
                        this.props.history.push("/")
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })

        console.log(this.state.AddQuestionFlag);
        console.log(this.props.isLoggedIn);
        console.log(this.props.username);

        /*if(!this.props.isLoggedIn){
            this.props.history.push("/");
        }*/
        /* this.setState({
             isLoggedIn: this.props.isLoggedIn,
             username:this.props.username
         });*/
    }
    handlePageChange = ((page) => {
        this.props.history.push(page);
    });


    handleFormChange(event) {
        this.setState(
            ...this.state,
            {
                [event.target.name]: event.target.value
            });
    }
    handleAddQuestion(){
        this.setState({
            AddQuestionFlag: true
        });
    }



    addQuestion(type) {
        switch (type) {
            case "DATE":
                this.state.questionsarray.push({
                    questionType: "DATE"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "MC":
                this.state.questionsarray.push({
                    questionType: "MC"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "ST":
                this.state.questionsarray.push({
                    questionType: "ST"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "STAR":
                this.state.questionsarray.push({
                    questionType: "STAR"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "BOOL":
                this.state.questionsarray.push({
                    questionType: "BOOL"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
        }

    }
    handleclose(){
        this.setState({
            closed:true
        })
    }

    handleSubmitSurveyForm() {
        // console.log(this.state.questionsarray);
        this.state.questionsarray.forEach((question) => {
            switch (question.questionType) {
                case "MC":
                    var options = {};
                    for (var i in question.options) {
                        console.log(options[i] = question.options[i])
                    }
                    question.options = options;
                    break;
            }
        });

        var formData = new FormData();
        formData = this.state;
        console.log(formData);
        if (this.state.role == "yes" && this.state.inputemail != "") {
            alert("select only one type of survey");
        }
        else {
        this.props.handleSubmitSurvey(formData);
    }

        // ToDo: Iterate over this.state.questions and send it to your server

    }

    handleLogout(){
        API.doLogout()
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                        this.props.handlePageChange("/login");
                    } else if (res.status === 400) {
                        this.props.handlePageChange("/home");
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            })

    }

    render(){
        return(
            <div>
                <Navbar handleLogout={this.props.handleLogout} handlePageChange={this.handlePageChange}/>
                <div className="container">

                    <div className="row surveyform">
                        <div className="col-md-12">
                            <form>
                                <div>
                                    <label>Survey Form Title  </label>
                                    <div>
                                        <input  onChange={ (e) => this.handleFormChange(e)} type="text" className="form-control" name="Title"
                                                id="Title" placeholder="Title"/>

                                        <button className="btn btn-primary addquestionbutton" type="button" name="add"onClick={this.handleAddQuestion.bind(this)}>ADD Question</button>

                                    </div>
                                </div>

                                {
                                    this.state.questionsarray.map((question) => {
                                        switch (question.questionType) {
                                            case "ST":
                                                return <Shorttext question={question}/>
                                                break;
                                            case "DATE":
                                                return <Date question={question}/>
                                                break;

                                            case "STAR":
                                                return <Star question={question}/>
                                                break;

                                            case "MC":
                                                return <MultipleChoice question={question}/>
                                                break;
                                            case "BOOL":
                                                return <YesNo question={question}/>
                                                break;

                                        }
                                    })
                                }


                                {
                                    this.state.AddQuestionFlag &&
                                    <div className="row">
                                        <Panel addQuestion={this.addQuestion.bind(this)}/>
                                    </div>
                                }
                                {
                                    this.state.closed &&
                                    <div className="row"><label>Register Users</label>
                                        <input  onChange={(e) => this.handleFormChange(e)} type="text" className="form-control" name="inputemail"
                                                id="inputemail" placeholder="Enter emaiil to register"/>
                                    </div>}

                                <div className="row">
                                    <div className="form-group">
                                        <label className="control-label" >Unique Survey?</label><br/>
                                        <input onChange={ (e) => this.handleFormChange(e)} type="radio" id="role"
                                               name="role" value="yes"/>
                                        <label className="control-label" >Yes</label>
                                        <input onChange={ (e) => this.handleFormChange(e)} type="radio" id="role"
                                               name="role" value="no"/>
                                        <label className="control-label" >No</label>
                                        <div className="row">

                                            <button type="button" className="btn-group" onClick={this.handleclose.bind(this)}>Closed Survey</button>
                                        </div>
                                        <div className="row">
                                            <label>Survey expires?</label>
                                            <input type="date" onChange={ (e) => this.handleFormChange(e)} name="expiry"/>
                                        </div>


                                        <div className="row">
                                            <div className="give">
                                                <button type="button" className="btn-success" onClick={this.handleSubmitSurveyForm.bind(this)}>Publish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>
            </div>


        );
    }


}


export default withRouter(Form);