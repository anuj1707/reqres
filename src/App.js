import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import { loginSuccess } from "./actions";

function App({ isLogged, loginSuccess }) {
  return (
    <Router>
      <div className="App">
        {isLogged ? (
          <div className="header">
            <Link to="/addUser">Add User</Link>{" "}
            <Link to="/" onClick={loginSuccess}>
              Log Out
            </Link>
          </div>
        ) : (
          ""
        )}

        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route path="/addUser">
            <AddUser />
          </Route>
          <Route path="/usersList">
            <UsersList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: () => dispatch(loginSuccess(false)),
  };
};

const mapStateToProps = ({ isLogged }) => {
  return {
    isLogged,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
