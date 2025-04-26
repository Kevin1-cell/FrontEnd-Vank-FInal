import { createContext, useContext, useState, useEffect, cache } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import cacheService from "../config/cacheConfig"; // Importamos el cacheService

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = checkAuth();
    if (authenticatedUser) {
      setUser(authenticatedUser);
      navigate(`/${authenticatedUser.rol.nombreUsuario.toLowerCase()}/home`); // Redirigir a su home
    }
  }, []);

  const checkAuth = () => {
    const storedUser = cacheService.obtenerUsuarioCache(); // Usamos el cacheService para obtener el usuario
    if (storedUser) {
      
      return storedUser;

    }
    return null;
  };
  


  const logout = () => {
    setUser(null);
    cacheService.eliminarUsuarioCache(); // Limpiar el cache al cerrar sesión
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
