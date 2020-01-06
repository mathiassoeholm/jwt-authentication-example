import React from "react";
import { Link } from "wouter";
import { Form } from "../presentational/Form";

function Signup() {
  const onSubmit = inputs => {
    return fetch("/.netlify/functions/signup", {
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
      <Form title="Signup" onSubmit={onSubmit} inputs={inputs} />
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}

export { Signup };
