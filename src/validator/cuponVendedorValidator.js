import * as yup from "yup";

const schemaCuponVendedor = yup.object().shape({
  descuento_porcentaje: yup
    .number()
    .typeError("El descuento debe ser un número")
    .min(0, "El descuento debe ser mínimo 0")
    .max(100, "El descuento no puede ser mayor a 100")
    .required("Descuento obligatorio"),

  vendedor_id: yup
    .number()
    .typeError("El vendedorId debe ser un valor numérico")
    .min(1, "El vendedorId debe ser mayor a 0")
    .required("vendedorId obligatorio"),

  nombre: yup
    .string()
    .required("nombre obligatorio")
    .max(100, "El nombre debe ser un string de 1 a 100 caracteres"),
});

// Función para validar datos del formulario
export const validarCuponVendedor = async (data) => {
  try {
    const datosValidados = await schemaCuponVendedor.validate(data, {
      abortEarly: false,
    });
    return { valido: true, datos: datosValidados, errores: null };
  } catch (error) {
    const erroresFormateados = {};
    error.inner.forEach((err) => {
      erroresFormateados[err.path] = err.message;
    });
    return { valido: false, errores: erroresFormateados };
  }
};
