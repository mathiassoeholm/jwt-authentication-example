import React, { useState } from "react";
import wait from "waait";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    try {
      // Temp delay while testing
      await wait(500);

      await fetch("/.netlify/functions/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Signup</h3>
      <form onSubmit={onSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <label>
            email
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <input type="submit" value={`Submit${loading ? "ting" : ""}`} />
        </fieldset>
      </form>
    </div>
  );
}

export { Signup };
