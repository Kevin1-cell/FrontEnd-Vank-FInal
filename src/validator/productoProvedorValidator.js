import * as yup from "yup";

// Esquema para crear producto
const crearProductoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  precio: yup
    .number()
    .required("El precio es obligatorio")
    .typeError("El precio debe ser un valor numérico")
    .positive("El precio debe ser un valor positivo"),
  descripcion: yup
    .string()
    .optional()
    .min(1, "La descripción debe tener al menos 1 carácter")
    .max(1000, "La descripción no puede exceder los 1000 caracteres"),
  cantidad_min: yup
    .number()
    .required("La cantidad mínima es obligatoria")
    .typeError("La cantidad mínima debe ser un valor numérico")
    .integer("La cantidad mínima debe ser un número entero")
    .min(0, "La cantidad mínima no puede ser negativa"),
  url_imagen: yup
    .string()
    .required("La URL de la imagen es obligatoria")
    .min(1, "La URL no puede estar vacía")
    .max(1000, "La URL no puede exceder los 1000 caracteres"),
  proveedor_id: yup
    .number()
    .required("El ID del proveedor es obligatorio")
    .typeError("El ID del proveedor debe ser un valor numérico")
    .integer("El ID del proveedor debe ser un número entero")
    .min(1, "El ID del proveedor debe ser al menos 1"),
});

// Esquema para editar producto
const editarProductoSchema = yup.object().shape({
  id: yup
    .number()
    .required("El ID es obligatorio")
    .integer("El ID debe ser un número entero")
    .min(1, "El ID debe ser al menos 1"),
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  precio: yup
    .number()
    .required("El precio es obligatorio")
    .typeError("El precio debe ser un valor numérico")
    .positive("El precio debe ser un valor positivo"),
  descripcion: yup
    .string()
    .optional()
    .min(1, "La descripción debe tener al menos 1 carácter")
    .max(1000, "La descripción no puede exceder los 1000 caracteres"),
  cantidad_min: yup
    .number()
    .required("La cantidad mínima es obligatoria")
    .typeError("La cantidad mínima debe ser un valor numérico")
    .integer("La cantidad mínima debe ser un número entero")
    .min(0, "La cantidad mínima no puede ser negativa"),
  url_imagen: yup
    .string()
    .required("La URL de la imagen es obligatoria")
    .min(1, "La URL no puede estar vacía")
    .max(1000, "La URL no puede exceder los 1000 caracteres"),
});

// Función para validar la creación de producto
export const validarCrearProducto = async (data) => {
  try {
    const validData = await crearProductoSchema.validate(data, { abortEarly: false });
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};

// Función para validar la edición de producto
export const validarEditarProducto = async (data) => {
  try {
    const validData = await editarProductoSchema.validate(data, { abortEarly: false });
    return { valido: true, datos: validData, errores: null };
  } catch (error) {
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};