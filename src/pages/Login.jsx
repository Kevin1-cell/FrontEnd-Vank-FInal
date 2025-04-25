import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Manejo de sesión
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar la función de login del contexto

  const handleLogin = async () => {
    try {
      const success = await login(username, password);

      if (success) {
        setMessage(`¡Bienvenido! Redirigiendo...`);
      } else {
        setMessage("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setMessage("Ocurrió un error. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
      <p>{message}</p>
      <div className="register-link">
        <p>¿No tienes una cuenta?</p>
        <button onClick={() => navigate("/register")}>Regístrate aquí</button>
      </div>
    </div>
  );
};

export default Login;
