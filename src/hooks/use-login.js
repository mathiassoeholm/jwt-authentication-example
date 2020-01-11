import { useUser } from "./use-user";

function useLogin() {
  const { saveUser } = useUser();

  const login = async ({ email, password }) => {
    const response = await fetch("/.netlify/functions/login", {
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

  return login;
}

export { useLogin };
