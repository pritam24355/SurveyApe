import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
class Date extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentWillMount(){
    }

    handleShortChange(event) {
        this.props.question["question"] = event.currentTarget.value;
    }

    handleAnswerChange(event) {
        this.props.onAnswer(this.props.question.questionId, event.currentTarget.value)
    }


    render(){
        return(
            <div className="pavan">
                <form className="form-horizontal" >
                    <div className="form-group ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            {
                                this.props.answerMode && <p>{this.props.question.questionName}</p> ||
                                !this.props.answerMode &&
                                <input onChange={ (e) => this.handleShortChange(e)} type="text" className="form-control" name="inputshortform"
                                       id="inputshortform" placeholder="Question Text"/>

                            }

                            {
                                this.props.answerMode && <div className="row">
                                    <form class="rating">
                                        <label>
                                            <input type="radio" name="stars" value="1" onClick={this.handleAnswerChange.bind(this)} />
                                            <span class="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="2" onClick={this.handleAnswerChange.bind(this)} />
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="3" onClick={this.handleAnswerChange.bind(this)} />
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="4" onClick={this.handleAnswerChange.bind(this)} />
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="5" onClick={this.handleAnswerChange.bind(this)} />
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                            <span class="icon">★</span>
                                        </label>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>

                </form>

            </div>





        );
    }


}


export default withRouter(Date);