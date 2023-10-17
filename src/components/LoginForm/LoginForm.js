import React, { useState } from "react";
import '../images/acme.png'
import '../images/hero-bg.jpg'
import '../images/login-img.jpg'
import '../images/logo.jpg'
import '../images/signup-img.jpg'

import './styles.css'
import { Alert,  Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginSuccess } from "../../actions";

const LoginForm = ({loginSuccess, isLogged}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    let body = JSON.stringify({
      email,
      password,
    });

    try {
      let response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      let result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        loginSuccess(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  if (isLogged) {
    return <Redirect to="/usersList" />;
  }

  return (
   <body>
    <div class="container">
        <div class="forms">
            <div class="form login">
            <h2 class="title">Login</h2>
        
      <Form id="formElem" onSubmit={handleSubmit}>
        <FormGroup>
        <i class=""></i>
                      
          <Label for="exampleEmail" class="usernamecl">Username</Label>
          <Input
            type="email"
            name="email"
            onChange={changeEmailHandler}
            id="exampleEmail"
            placeholder="Username"
          />
        </FormGroup>
        <FormGroup>
                    
          <Label for="examplePassword" class="usernamecl">Password</Label>
          <Input
            type="password"
            name="password"
            onChange={changePasswordHandler}
            id="examplePassword"
            placeholder="Password"
          />
        </FormGroup>
        <button type="submit" className = 'button'>Log In</button>
      </Form>
      {error ? (
        <Alert color="danger">
          Something bad happened... {<br />}Reason: {error}
        </Alert>
      ) : (
        ""
      )}
      </div>
      </div>
    </div>
    </body>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginSuccess: (data) => dispatch(loginSuccess(data)),
  };
};

const mapStateToProps = ({ isLogged }) => {
  return {
    isLogged,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
