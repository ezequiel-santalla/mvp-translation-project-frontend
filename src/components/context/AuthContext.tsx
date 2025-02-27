import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken")
  );

  const login = (token, role) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
