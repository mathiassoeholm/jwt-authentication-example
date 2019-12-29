import React from "react";

function Signup() {
  return (
    <div>
      <h3>Signup</h3>
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
    </div>
  );
}

export { Signup };
