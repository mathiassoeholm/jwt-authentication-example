import React from "react";
import { Link } from "wouter";
import { Form } from "../presentational/Form";
import { useUser } from "../hooks/use-user";

function Login() {
  const { saveUser } = useUser();

  const onSubmit = async inputs => {
    let response = await fetch("/.netlify/functions/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password
      })
    });

    if (response.ok) {
      const user = await response.json();
      saveUser(user);
    }
  };

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
      <Form title="Login" onSubmit={onSubmit} inputs={inputs} />
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export { Login };
