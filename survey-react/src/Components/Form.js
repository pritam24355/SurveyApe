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

class Form extends Component{
    constructor(props){
        super();
        this.state={
            questionsarray:[],
            AddQuestionFlag:false,
            Title:"",
            inputemail:""
        }
    }
    componentWillMount(){
        console.log(this.state.AddQuestionFlag);
        console.log(this.props.isLoggedIn);
        this.setState({
            isLoggedIn: this.props.isLoggedIn,
            username:this.props.username
        });
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
                    type: "DATE"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "MC":
                this.state.questionsarray.push({
                    type: "MC"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "ST":
                this.state.questionsarray.push({
                    type: "ST"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "STAR":
                this.state.questionsarray.push({
                    type: "STAR"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
            case "BOOL":
                this.state.questionsarray.push({
                    type: "BOOL"
                });
                this.setState({
                    AddQuestionFlag: false
                });
                break;
        }

    }

    handleSubmitSurveyForm() {
        console.log(this.state.questionsarray);
        var formData = new FormData();
        formData=this.state;
        this.props.handleSubmitSurvey(formData);


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
            <div className="container">
                <Navbar handleLogout={this.props.handleLogout} handlePageChange={this.handlePageChange}/>
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <form className="form-horizontal" >
                        <div className="form-group ">
                            <label className="col-lg-3">Form Title  </label>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <input  onChange={ (e) => this.handleFormChange(e)} type="text" className="form-control" name="Title"
                                       id="Title" placeholder="Title"/>

                                <button className="btn-primary" type="button" name="add"onClick={this.handleAddQuestion.bind(this)}>ADD Question</button>

                            </div>
                        </div>

                        {
                            this.state.questionsarray.map((question) => {
                                switch (question.type) {
                                    case "ST":
                                        return <Shorttext question={question}/>
                                        break;
                                    case "DATE":
                                        return <Date question={question}/>
                                            break;

                                    case "MC":
                                        return <MultipleChoice question={question}/>
                                }
                            })
                        }


                        {
                            this.state.AddQuestionFlag &&
                            <div className="row">
                                <Panel addQuestion={this.addQuestion.bind(this)}/>
                            </div>
                        }
                        <label>Register Users</label>
                        <input  onChange={ (e) => this.handleFormChange(e)} type="text" className="form-control" name="inputemail"
                                id="inputemail" placeholder="Enter emaiil to register"/>

                        <button type="button" name="submitform" onClick={this.handleSubmitSurveyForm.bind(this)}>Publish</button>
                    </form>

                </div>

                </div>

            </div>



        );
    }


}


export default withRouter(Form);