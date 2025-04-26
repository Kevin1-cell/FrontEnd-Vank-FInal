import { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";
import { validarRegistro } from "../validator/authValidator"; // o donde lo tengas guardado
import { object } from "yup";


const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    nombre: "",  // Cambiado de nombre_completo a nombre
    email: "",   // Cambiado de correo a email
    contrasenna: "",
    confirmarContrasenna: "",
    telefono: "",
  });

  const [rol, setRol] = useState("");  // Cambiado de rolId a rol y ahora será string


  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {

    console.log("Datos de registro:", inputs, rol);  // Para depuración
    if (inputs.contrasenna !== inputs.confirmarContrasenna) {
      toast.error("Las contraseñas no coinciden.",{
        position: 'bottom-right', // Aquí configuramos la posición
      });
      return;
    }
  
    // Construimos el paquete limpio para enviar
    const userInfo = {
      nombre: inputs.nombre,
      email: inputs.email,
      contrasenna: inputs.contrasenna,
      telefono: inputs.telefono,
      rol: rol.toLowerCase(),
    };
  
    const resultado = await validarRegistro(userInfo);

    if (!resultado.valido) {
      console.log(resultado)
      if (!resultado.valido) {
        console.log(resultado);
        toast.error(resultado.errores[Object.keys(resultado.errores)[0]], {
          position: 'bottom-right',
        });
        return;
      }
      
      
      return;
    }
    try {
      await registerUser(userInfo);
  
        toast.success("Registro exitoso. Redirigiendo a inicio de sesión...",{
          position: 'bottom-right', // Aquí configuramos la posición
        });
        navigate("/login");


    } catch (error) {

      toast.error(error.response.data.error,{
        position: 'bottom-right', // Aquí configuramos la posición
      });
    }
  };
  

  return (
    <div className="register-container">
      <h2>REGISTRO DE USUARIO</h2>
      <div className="form-group">
        {[
          { name: "nombre", label: "Nombre completo", type: "text" },
          { name: "email", label: "Correo electrónico", type: "email" },
          { name: "contrasenna", label: "Contraseña", type: "password" },
          { name: "confirmarContrasenna", label: "Confirmar contraseña", type: "password" },
          { name: "telefono", label: "Número de teléfono", type: "tel" },
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
        <select onChange={(e) => setRol(e.target.value)} value={rol}>
          <option value="">Selecciona un rol</option>
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
          <option value="proveedor">Proveedor</option> {/* Nota: "provedor" parece un typo, verifica si es correcto */}
        </select>
      </div>

      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;