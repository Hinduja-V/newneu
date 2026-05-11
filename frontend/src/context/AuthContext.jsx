import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 Load user from FastAPI login (localStorage)
    const localUser = localStorage.getItem("mindcareUser");

    if (localUser) {
      setUser(JSON.parse(localUser));
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN (FastAPI)
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("mindcareUser", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("mindcareUser");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};