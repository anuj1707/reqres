import React, { useState, useEffect } from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLogged, setIsLogged] = useState(false);


  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const changePasswordHandler = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  if (isLogged) {
    return <Redirect to="/usersList" />;
  }


//   const handleLogin = () => {
//     if (isLogged) {
//       return <Redirect to="/usersList" />;
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("email: ", email);
    // console.log("password: ", password);
    setError(false);
    let body = JSON.stringify({
      email,
      password,
    });
    console.log("body:", body);
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
        console.log("error: ", result.error);
        setError(result.error);
      } else {
        setIsLogged(true);
      }

      console.log(result);
    } catch (err) {
      alert(err); // TODO: ERROR
    }
  };

  return (
    <div>
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
        <Button type="submit">
          Submit
        </Button>
      </Form>
      {error ? (
        <Alert color="danger">Something bad happened. Reason: {error}</Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginForm;
