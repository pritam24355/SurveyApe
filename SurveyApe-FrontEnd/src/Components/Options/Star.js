import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
class Star extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    componentWillMount(){
    }

    handleShortChange(event) {
        this.props.question["questionName"] = event.currentTarget.value;
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
                                !this.props.answerMode && <input onChange={ (e) => this.handleShortChange(e)} type="text" className="form-control" name="inputshortform"
                                                                 id="inputshortform" placeholder="Question Text" value={this.props.question.questionName}/>
                            }

                            {

                                this.props.answerMode &&<input type="date" onChange={this.handleAnswerChange.bind(this)} placeholder="" className="form-control" />
                            }
                        </div>
                    </div>

                </form>

            </div>






        );
    }


}


export default withRouter(Star);