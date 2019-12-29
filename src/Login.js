import React from "react";
import { Link } from "wouter";

function Login() {
  return (
    <div>
      <h3>Login</h3>
      <form>
        <label>
          email
          <input />
        </label>
        <label>
          password
          <input type="password" />
        </label>
        <input type="submit" />
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export { Login };
