import { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <h2>REGISTRO DE USUARIO</h2>
      <div className="form-group">
        {[
          { name: "fullName", label: "Nombre completo", type: "text" },
          { name: "email", label: "Correo electrónico", type: "email" },
          { name: "password", label: "Contraseña", type: "password" },
          {
            name: "confirmPassword",
            label: "Confirmar contraseña",
            type: "password",
          },
          { name: "phone", label: "Número de teléfono", type: "tel" },
        ].map(({ name, label, type }) => (
          <div key={name} className="input-container">
            <input
              type={type}
              name={name}
              value={inputs[name]}
              onChange={handleChange}
              placeholder=" "
            />
            <label>{label}</label>
          </div>
        ))}
      </div>
      <div className="form-group">
        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Selecciona un rol</option>
          <option value="Cliente">Cliente</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Proveedor">Proveedor</option>
        </select>
      </div>
      <button onClick={() => navigate("/login")}>Registrarse</button>
    </div>
  );
};

export default Register;
