import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
class MultipleChoice extends Component{
    constructor(props){
        super(props);
        this.state={}
        props.question.options = props.question.options || [];
        if(this.props.answerMode) {
            props.question.answers = new Array(props.question.options.length);

        }



    }
    componentWillMount(){
    }

    handleShortChange(event) {
        this.props.question["question"] = event.currentTarget.value;
    }

    handleAnswerChange(index, event) {
        this.props.question.answers[index] = true;
    }

    updateOption(index, event) {
        this.props.question.options[index] = event.currentTarget.value;
        this.forceUpdate();
    }

    deleteOption(index, event) {
        this.props.question.options.splice(index, 1)
        this.forceUpdate();
    }

    addOption() {
        this.props.question.options.push('');
        this.forceUpdate();

    }

    render(){
        return(
            <div className="pavan">
                <form className="form-horizontal" >
                    <div className="form-group ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            {
                                this.props.answerMode && <p>{this.props.question.questionName}</p> ||
                                !this.props.answerMode &&<div> <input onChange={ (e) => this.handleShortChange(e)} type="text" className="form-control" name="inputshortform"
                                                                 id="inputshortform" placeholder="Question Text"/>
                                    <div className="row">
                                        <button className="btn-success" type="button" onClick={this.addOption.bind(this)}>Add options</button>
                                    </div>
                                </div>
                            }



                            {
                                !this.props.answerMode && this.props.question.options.map((el, index) => {
                                    return <div>
                                        <input type = "text" placeholder="your Option text here" onChange={this.updateOption.bind(this, index)}/>
                                        <button type="button" onClick={this.deleteOption.bind(this, index)}>delete</button>
                                    </div>
                                }) ||
                                    this.props.answerMode && this.props.question.options.map((el, index) => {
                                        return <div>
                                            <input type="checkbox" onChange={this.handleAnswerChange.bind(this, index)}/>
                                            <label>{el}</label>
                                        </div>
                                    })
                            }


                            {
                                this.props.answerMode && <input type="text" onChange={this.handleAnswerChange.bind(this)} placeholder="Your answer here..." className="form-control" />
                            }
                        </div>
                    </div>

                </form>

            </div>
        );
    }


}


export default withRouter(MultipleChoice);