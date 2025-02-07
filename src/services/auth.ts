import api from "./api";

// interface LoginResponse {
//   fetchAccessToken: string;
// }

export const login = async (email: string, name: string) => {
  try {
    const response = await api.post("/auth/login", {
      name,
      email,
    });

    // if (response.data === 200) {

    //   return;
    // }

    // // Expires in 1 hour
    // const expirationTime: number = Date.now() + 3_600_000;
  } catch (e) {
    console.error("Login failed", e);
    throw new Error("Unable to login");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout", {});
  } catch (e) {
    console.error("Logout failed", e);
    throw new Error("Unable to logout, session is still valid");
  }
};
