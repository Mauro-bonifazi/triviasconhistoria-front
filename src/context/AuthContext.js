import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isUserLogged, setUserLogged] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setUserLogged(true);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUserLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isUserLogged, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
