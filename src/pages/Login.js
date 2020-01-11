import React from "react";
import { Link } from "wouter";
import { Form } from "../components/Form";
import { useLogin } from "../hooks/use-login";

function Login() {
  const login = useLogin();

  const inputs = [
    {
      name: "email",
      type: "email"
    },
    {
      name: "password",
      type: "password"
    }
  ];

  return (
    <div>
      <Form title="Login" onSubmit={login} inputs={inputs} />
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export { Login };
