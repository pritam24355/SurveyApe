import React from "react";
import { Route, IndexRoute, Link } from "react-router";

import App from "./containers/App";
import FormContainer from "./containers/builder/FormContainer";


import NotificationContainer from "./containers/NotificationContainer";
import FormCreatedContainer from "./containers/FormCreatedContainer";
import UserFormContainer from "./containers/UserFormContainer";
import RecordCreatedContainer from "./containers/RecordCreatedContainer";

import WelcomeContainer from "./containers/WelcomeContainer";

import Header from "./components/Header";




const common = {
  notifications: NotificationContainer,
  header: Header
};

const LinkToBuilder = (props) => {
  const {children} = props;
  const browserHistory = props.history;

  return (
    <div className="list-group">
      <button type="button" className="list-group-item" onClick={() => {browserHistory.goBack();}}>
        <i className="glyphicon glyphicon-chevron-left" />
        {props.text || "Back"}
      </button>
      {children}
    </div>
  );
};

const BackAndCheck = (props) => {
  return (
    <div>
      <LinkToBuilder text="Continue editing" {...props} >
        <Link className="list-group-item" to="/builder/json">
          <i className="glyphicon glyphicon-fullscreen" /> View as JSON
        </Link>
      </LinkToBuilder>
      
    </div>
  );
};

const BackAndDownloadJSONSchema = (props) => {
  return (
    <div>
      <LinkToBuilder text="Continue editing" {...props}/>
      <div className="list-group">
      
      </div>
    </div>
  );
};

const LinkToHome = () => {
  return (
    <div>
      <Link className="list-group-item" to="/">
        <i className="glyphicon glyphicon-chevron-left" />
        "Home"
      </Link>
    </div>
  );
};

export default (
    <Route path="/" component={App}>
      <IndexRoute components={{...common, mainComponent: WelcomeContainer}} />
     
      <Route path="builder"
        components={{...common, content: FormContainer}} />
      
      <Route path="builder/published/:adminToken"
        components={{...common, sidebarComponent: BackAndCheck, content: FormCreatedContainer}} />
      
      <Route path="form/:id"
        components={{...common, mainComponent: UserFormContainer}} />
      
      <Route path="*" components={{
        sidebarComponent: LinkToHome,
        content: _ => <h1>Page not found.</h1>
      }}/>
    </Route>
  );
