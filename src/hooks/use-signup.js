import { useUser } from "./use-user";

function useSignup() {
  const { saveUser } = useUser();

  const signup = async ({ email, password }) => {
    const response = await fetch("/.netlify/functions/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (response.ok) {
      const user = await response.json();
      saveUser(user);
    }
  };

  return signup;
}

export { useSignup };
