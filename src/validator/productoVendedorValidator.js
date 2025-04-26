import * as yup from "yup";

// Esquema para publicar producto
const publicarProductoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  vendedor_id: yup
    .number()
    .required("El ID del vendedor es obligatorio")
    .integer("El ID del vendedor debe ser un número entero")
    .min(1, "El ID del vendedor debe ser al menos 1"),
});

// Esquema para actualizar precio
const actualizarPrecioSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre del producto es obligatorio"),
  vendedor_id: yup
    .number()
    .required("El ID del vendedor es obligatorio")
    .integer("El ID del vendedor debe ser un número entero")
    .min(1, "El ID del vendedor debe ser al menos 1"),
  nuevoPrecio: yup
    .number()
    .required("El nuevo precio es obligatorio")
    .min(0, "El precio debe ser mayor o igual a 0"),
});

// Función para validar la publicación de producto
export const validarPublicarProducto = async (data) => {
  try {
    const validData = await publicarProductoSchema.validate(data, { abortEarly: false });
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};

// Función para validar la actualización de precio
export const validarActualizarPrecio = async (data) => {
  try {
    const validData = await actualizarPrecioSchema.validate(data, { abortEarly: false });
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};