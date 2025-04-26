import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import cacheConfig from "../config/cacheConfig";
import { loginUser } from "../services/authService";
import { validarLogin } from "../validator/authValidator";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    const userInfo = { email: username, contrasenna: password };
    const resultado = await validarLogin(userInfo);
    
    if (!resultado.valido) {
      toast.error(resultado.errores[Object.keys(resultado.errores)[0]], {
        position: 'bottom-right',
      });
      return;
    }
    
    try {
      const usuario = await loginUser(username, password);
      toast.success(`¡Bienvenido! Redirigiendo...`, {
        position: 'bottom-right',
      });
      cacheConfig.cambiarAgregarUsuarioCache(usuario);
      setUser(usuario);
      navigate(`/${usuario.rol.nombreUsuario}/home`);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Usuario o contraseña incorrectos", {
        position: 'bottom-right',
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <button className="login-btn" onClick={handleLogin}>
        Ingresar
      </button>

      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-text">o continúa con</span>
        <span className="divider-line"></span>
      </div>

      <div className="social-login">
        <button className="social-btn">
          <i className="fab fa-google"></i>
        </button>
        <button className="social-btn">
          <i className="fab fa-facebook-f"></i>
        </button>
        <button className="social-btn">
          <i className="fab fa-apple"></i>
        </button>
      </div>

      <div className="register-link">
        <p>¿No tienes una cuenta? <button onClick={() => navigate("/register")}>Regístrate aquí</button></p>
      </div>
    </div>
  );
};

export default Login;