import React, { useState } from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
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
    <div style={{ width: "300px", margin: "20px" }}>
      <Form id="formElem" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            onChange={changeEmailHandler}
            id="exampleEmail"
            placeholder="Введите ваш Email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            onChange={changePasswordHandler}
            id="examplePassword"
            placeholder="Введите ваш пароль"
          />
        </FormGroup>
        <Button type="submit">Log In</Button>
      </Form>
      {error ? (
        <Alert color="danger">
          Something bad happened... {<br />}Reason: {error}
        </Alert>
      ) : (
        ""
      )}
    </div>
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
