import React, { useState, useEffect } from "react";

import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addUserRequest } from "../../actions";

function AddUser({ data, isLogged, userAdded, addUserRequest }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(false);

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

// const changeContactHandler = (e) => {
//     setContact(e.target.value);
//   };
//   const changePasswordHandler = (e) => {
//     setPassword(e.target.value);
//   };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    let body = JSON.stringify({
      email,
      first_name: name,
      avatar:
        "https://yt3.ggpht.com/a/AGF-l7_ymSxOKPUYZG4H3FPiz6iWO6eVfqEs1jS5qw=s900-c-k-c0xffffffff-no-rj-mo",
    });

    try {
      let response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      let result = await response.json();

      if (result.error) {
        setError(result.error);
      }
      if (result.id) {
        let filteredData = Object.assign([], data);
        filteredData.push(result);
        addUserRequest(filteredData);
      }

    } catch (err) {
      alert(err); // TODO: ERROR
    }
  };

  useEffect(() => {
    if (!isLogged) {
      return <Redirect to="/" />;
    }
  });
  if (userAdded) {
    return <Redirect to="/usersList" />;
  }

  return (
    <div style={{ width: "300px", margin: "20px" }}>
      <Form id="formElem" onSubmit={handleSubmit}>
        <Label>Edit User</Label>
        <FormGroup>
          <Label for="exampleName">Username</Label>
          <Input
            type="name"
            name="name"
            onChange={changeNameHandler}
            id="exampleName"
            placeholder="Username"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            onChange={changeEmailHandler}
            id="exampleEmail"
            placeholder="Email"
          />
        </FormGroup>

        <FormGroup>
          <Label for="Contact">Contact</Label>
          <Input
            type="Contact"
            name="Contact"
//            onChange={changeContactHandler}
            id="Contact"
            placeholder="Contact"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
  //          onChange={changePasswordHandler}
            id="password"
            placeholder="password"
          />
        </FormGroup>
        <Button type="submit">Edit User</Button>
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserRequest: (data) => dispatch(addUserRequest(data)),
  };
};

const mapStateToProps = ({ data, isLogged, userAdded }) => {
  return {
    data,
    isLogged,
    userAdded,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
