import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import UpdateUser from "./components/UpdateUser";

import { loginSuccess } from "./actions";
import Navbar from "./components/Navbar";
function App({ isLogged, loginSuccess }) {
  return (
    <Router>
      <Navbar> </Navbar>
      <div className="App">
        {isLogged ? (
          <div className="header">
            <Link to="/addUser"><button className = 'btn'>Add User</button></Link>{" "}
            <Link to="/" onClick={loginSuccess}>
              
            <button className = 'btn-small'>Log Out</button>
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
          <Route path="/updateUser">
            <UpdateUser />
            
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
