
import * as yup from "yup";


const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio").min(3).max(150),
  email: yup.string().required("El email es obligatorio").email("Email inválido"),
  telefono: yup.string().required("El teléfono es obligatorio").matches(/^\d{10}$/, "El teléfono debe tener exactamente 10 números"),
  contrasenna: yup.string().required("La contraseña es obligatoria").min(8,"Contraseña muy corta minimo de 8 caracteres").max(72,"Contraseña muy larga maximo de 72 caracteres"),
  rol: yup.string().required("El rol es obligatorio").oneOf(["cliente", "vendedor", "proveedor"], "Rol inválido"),
});

const schemaLogin = yup.object().shape({
  email: yup.string().required("El email es obligatorio").email("Email inválido"),
  contrasenna: yup.string().required("La contraseña es obligatoria").min(8,"Contraseña muy corta minimo de 8 caracteres").max(72,"Contraseña muy larga maximo de 72 caracteres"),
});

// Función para validar los datos
export const validarRegistro = async (data) => {
  try {
    // Validar los datos con yup
    console.log("Datos a validar:", data); // Para depuración
    const validData = await schema.validate(data, { abortEarly: false }); 
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    // Si hay errores, los formateamos y los retornamos
    console.log("Errores de validación:", error.inner); // Para depuración
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};


export const validarLogin = async (data) => {
  try {
    // Validar los datos con yup
    const validData = await schemaLogin.validate(data, { abortEarly: false }); 
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    // Si hay errores, los formateamos y los retornamos
    console.log("Errores de validación:", error.inner); // Para depuración
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};
