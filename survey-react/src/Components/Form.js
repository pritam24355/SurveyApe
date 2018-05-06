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

class Form extends Component{
    constructor(){
        super();
        this.state={
            questionsarray:[],
            AddQuestionFlag:false,
            Title:""
        }
    }
    componentWillMount(){
        console.log(this.state.AddQuestionFlag);
        console.log(this.props.isLoggedIn);
    }

    handleFormChange(event) {
            this.setState(
                ...this.state,
               {
                  Title: event.target.value
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
                break;
            case "MC":
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
                break;
            case "BOOL":
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

    render(){
        return(
            <div className="container">
                <Navbar/>
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <form className="form-horizontal" >
                        <div className="form-group ">
                            <label className="col-lg-3">Form Title  </label>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <input  onChange={ (e) => this.handleFormChange(e)} type="text" className="form-control" name="inputformname"
                                       id="inputformname" placeholder="Title"/>

                                <button className="btn-primary" type="button" name="add"onClick={this.handleAddQuestion.bind(this)}>ADD Question</button>

                            </div>
                        </div>

                        {
                            this.state.questionsarray.map((question) => {
                                switch (question.type) {
                                    case "ST":
                                        return <Shorttext question={question}/>

                                }
                            })
                        }


                        {
                            this.state.AddQuestionFlag &&
                            <div className="row">
                                <Panel addQuestion={this.addQuestion.bind(this)}/>
                            </div>
                        }


                        <button type="button" name="submitform" onClick={this.handleSubmitSurveyForm.bind(this)}>Publish</button>
                    </form>

                </div>

                </div>

            </div>



        );
    }


}


export default withRouter(Form);