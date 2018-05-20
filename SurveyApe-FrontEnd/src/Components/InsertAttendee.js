import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link,withRouter} from "react-router-dom";
import * as API from '../api/API';

class InsertAttendee extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount(){

        console.log(this.props.surveyId);
        API.doInsertAttendee(this.props.surveyId)
            .then((res) => {
                    console.log(res.status);
                    if (res.status === 200) {
                     this.props.history.push("/listsurvey")

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


            </div>
        );
    }
}
export default withRouter(InsertAttendee);