import React, {Component} from 'react';
import {Link,Redirect,withRouter} from "react-router-dom";
import 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
class Panel extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentWillMount(){
    }

    render(){
        return(
            <div className="pavan">
                <form className="form-horizontal" >
                    <div className="form-group ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <button className="btn btn-primary" type="button" onClick={() => this.props.addQuestion("MC")} >MultipleChoice</button>
                            <button className="btn btn-primary" type="button" onClick={() => this.props.addQuestion("ST")} >Short Text</button>
                            <button className="btn btn-primary" type="button" onClick={() => this.props.addQuestion("DATE")} >Date</button>
                            <button className="btn btn-primary" type="button" onClick={() => this.props.addQuestion("BOOL")} >Yes/NO</button>
                            <button className="btn btn-primary" type="button" onClick={() => this.props.addQuestion("STAR")} >StarRating</button>
                        </div>
                    </div>

                </form>

            </div>






        );
    }


}


export default withRouter(Panel);