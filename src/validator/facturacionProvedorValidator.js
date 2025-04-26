import * as yup from "yup";

// Esquema para los items de la factura
const itemFacturaSchema = yup.object().shape({
  cantidad_producto: yup
    .number()
    .required("La cantidad es obligatoria")
    .integer("La cantidad debe ser un número entero")
    .min(1, "La cantidad debe ser al menos 1"),
  producto_id: yup
    .number()
    .required("El ID de producto es obligatorio")
    .integer("El ID de producto debe ser un número entero")
    .min(1, "El ID de producto debe ser al menos 1"),
});

// Esquema principal para la factura
const facturaSchema = yup.object().shape({
  cupon: yup
    .string()
    .optional()
    .max(100, "El cupón no puede tener más de 100 caracteres"),
  proveedor_id: yup
    .number()
    .required("El ID de proveedor es obligatorio")
    .integer("El ID de proveedor debe ser un número entero")
    .min(1, "El ID de proveedor debe ser al menos 1"),
  vendedor_id: yup
    .number()
    .required("El ID de vendedor es obligatorio")
    .integer("El ID de vendedor debe ser un número entero")
    .min(1, "El ID de vendedor debe ser al menos 1"),
  items_factura: yup
    .array()
    .of(itemFacturaSchema)
    .required("Los items de factura son obligatorios")
    .min(1, "Debe haber al menos un item en la factura"),
});

// Función para validar los datos de la factura
export const validarFactura = async (data) => {
  try {
    // Validar los datos con yup
    const validData = await facturaSchema.validate(data, { abortEarly: false });
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