import { useUser } from "./use-user";

function useLogout() {
  const { deleteUser } = useUser();

  const logout = async () => {
    const response = await fetch("/.netlify/functions/logout", {
      method: "POST"
    });

    if (response.ok) {
      deleteUser();
    }
  };

  return logout;
}

export { useLogout };
