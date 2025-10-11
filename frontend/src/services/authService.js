import api from "../api";

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Expect { token, team: {...} }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

// Optional: logout function
export const logoutUser = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
};
