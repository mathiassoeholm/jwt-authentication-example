import React from "react";
import { Link } from "wouter";
import { Form } from "../components/Form";
import { useAuth } from "../providers/auth-provider";

function Signup() {
  const { signup } = useAuth();

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
      <Form title="Signup" onSubmit={signup} inputs={inputs} />
      <p>
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}

export { Signup };
