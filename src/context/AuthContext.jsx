import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = checkAuth();
    if (authenticatedUser) {
      setUser(authenticatedUser);
      navigate(`/${authenticatedUser.role.toLowerCase()}/home`); // Redirigir a su home
    }
  }, []);

  const checkAuth = () => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser && parsedUser.username ? parsedUser : null;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        localStorage.removeItem("user"); 
      }
    }
    return null;
  };
  

  const login = (username, password) => {
    const user = loginUser(username, password);

    if (user && typeof user === "object") {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user)); // Asegurar que se guarda como JSON
      navigate(`/${user.role}/home`);
    } else {
      console.error("Error: el usuario no es un objeto válido.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
