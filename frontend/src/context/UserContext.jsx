import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const UserContext = createContext({
  user: null,
  token: null,
  login: async (email, password) => {},
  logout: () => {},
  loading: false,
  error: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const persist = (tkn, usr) => {
        if (tkn) localStorage.setItem("auth_token", tkn);
        else localStorage.removeItem("auth_token");

        // 🔑 The user object we persist should now be the MEMBER's data, not the full team.
        if (usr) localStorage.setItem("auth_user", JSON.stringify(usr)); 
        else localStorage.removeItem("auth_user");
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data: loginData } = await api.post("/auth/login", { email, password });
            const tkn = loginData.token;
            setToken(tkn);

            // Fetch the full team data
            const { data: teamData } = await api.get("/teams/my-team", {
                headers: { Authorization: `Bearer ${tkn}` },
            });
            
            // 🚀 CRITICAL FIX: Find the logged-in member's profile from the team list
            const loggedInMember = teamData.members.find(
                // This logic is crucial: it assumes the backend provides a unique identifier
                // (like email) in the team members list that matches the one used for login.
                // If the email is not available, you MUST use a dedicated /users/me endpoint 
                // that returns the logged-in user's profile based on the token.
                // Assuming email is the identifier here:
                (member) => member.email.toLowerCase() === email.toLowerCase()
            );

            if (!loggedInMember) {
                throw new Error("User profile not found in team data.");
            }

            // Set the state to the specific member's profile
            setUser(loggedInMember); // 🚀 Set the specific MEMBER object (name, isLeader, etc.)

            // Persist the specific member object
            persist(tkn, loggedInMember);
            setLoading(false);

            return { success: true, data: loggedInMember };
        } catch (err) {
            setLoading(false);
            const msg = err.response?.data?.message || err.message;
            setError(msg);
            // Clear token and user on failed login/fetch
            setToken(null);
            setUser(null);
            persist(null, null);
            return { success: false, error: msg };
        }
    };

  const logout = () => {
    setUser(null);
    setToken(null);
    persist(null, null);
  };

  const authHeaders = () => (token ? { Authorization: `Bearer ${token}` } : {});

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, loading, error, authHeaders }}
    >
      {children}
    </UserContext.Provider>
  );
};
