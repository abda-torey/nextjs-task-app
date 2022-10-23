import { useRef, useState, useContext } from "react";

import classes from "./RegisterForm.module.css";
import { Form, Spinner, InputGroup, Button, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
  return data;
}

const RegisterForm = (props) => {
  const passRef = useRef();

  const emailRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredPassword = passRef.current.value;
    const enteredEmail = emailRef.current.value;
    console.log(enteredEmail, enteredPassword);

    try {
      const response = await createUser(enteredEmail, enteredPassword);

      console.log(response);
    } catch (error) {
      console.log(error)
        
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <img
          src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png"
          alt=""
        />
      </div>
      <div className="text-center mt-4">My ToDo App</div>
      <Form className="p-3 mt-3" onSubmit={submitHandler}>
        <InputGroup>
          <InputGroup.Text>
            <Icon.Person />
          </InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            ref={emailRef}
          />
        </InputGroup>

        <InputGroup className="mt-3 pt-3">
          <InputGroup.Text>
            <Icon.Key />
          </InputGroup.Text>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            ref={passRef}
          />
        </InputGroup>

        <Button variant="primary" className={classes.button} type="submit">
          Register
        </Button>
      </Form>
      <div className="text-center fs-6">
        <a href="#">Sign in</a>
      </div>
    </div>
  );
};

export default RegisterForm;
