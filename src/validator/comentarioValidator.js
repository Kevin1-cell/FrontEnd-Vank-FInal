// utils/validation.js
import * as yup from 'yup';

const schema = yup.object().shape({
  contenido: yup.string()
    .required("El contenido es obligatorio")
    .min(1, "El contenido debe tener al menos 1 caracter")
    .max(1000, "El contenido debe tener un máximo de 1000 caracteres"),
  
  cliente_id: yup.number()
    .required("El cliente_id es obligatorio")
    .typeError("El cliente_id debe ser un valor numérico"),
  
  producto_id: yup.number()
    .required("El producto_id es obligatorio")
    .typeError("El producto_id debe ser un valor numérico"),
});

// Función para validar los datos
export const validarComentario = async (data) => {
  try {
    // Validar los datos con yup
    const validData = await schema.validate(data, { abortEarly: false }); // abortEarly: false para obtener todos los errores
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    // Si hay errores, los formateamos y los retornamos
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};
