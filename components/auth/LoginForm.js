import { useRef, useState, useContext } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./loginForm.module.css";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  async function submitHandler(event) {
    setIsLoading(true);

    event.preventDefault();
    setErrorUser(null);
    setErrorPassword(null);
    const enteredEmail = emailRef.current.value;
    const enteredpassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredpassword,
    });

    

    if (!result.error) {
      
      router.replace("/UserTasks");
      setIsLoading(false);
      console.log(result);
    } else {
      setIsLoading(false);
      if (result.error === "password is incorect") {
        setErrorPassword(result.error);
      } else if (result.error === "No User Found") {
        setErrorUser(result.error);
      }
    }
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <img src="/clock.png" alt="" />
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
        {errorUser && <small className="text-danger">{errorUser}</small>}
        <InputGroup className="mt-3 pt-3">
          <InputGroup.Text>
            <Icon.Key />
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
        </InputGroup>
        {errorPassword && (
          <small className="text-danger">{errorPassword}</small>
        )}
        {!isLoading && (
          <Button
            variant="primary"
            className={classes.button}
            onClick={submitHandler}
          >
            Login
          </Button>
        )}

        {isLoading && (
          <Button variant="primary" disabled className={classes.button}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading....
          </Button>
        )}
      </Form>
      <div className="text-center fs-6">
        <a href="#">Forget password?</a> or{" "}
        <Link href="/auth/register">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
