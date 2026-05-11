// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // name, age, gender, etc.
  const [loading, setLoading] = useState(true);

  // optionally sync with Firestore once user is available
  useEffect(() => {
    // e.g. fetch user data from Firestore if user exists
    // if (user) fetchUserData(user.uid).then(data => setUserData(data));
    setLoading(false);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,           // from AuthContext
        userData,       // extra profile data
        setUserData,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};