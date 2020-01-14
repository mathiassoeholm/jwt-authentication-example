import React from "react";
import { Link } from "wouter";
import { Form } from "../components/Form";
import { useAuth } from "../providers/auth-provider";

function Login() {
  const { login } = useAuth();

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
