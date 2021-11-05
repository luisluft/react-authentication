import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedUserIsLoggedIn) setIsLoggedIn(true);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
  };

  const loginHandler = (username, password) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
