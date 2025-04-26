import * as yup from "yup";

// Esquema de validación
const schemaCuponProveedor = yup.object().shape({
  fecha_limite: yup
    .date()
    .typeError("Fecha límite debe ser una fecha")
    .required("Fecha límite obligatoria"),

  monto_pendiente: yup
    .number()
    .typeError("Monto pendiente debe ser un número")
    .min(0, "Monto pendiente debe ser un número mayor o igual a 0")
    .required("Monto pendiente obligatorio"),

  factura: yup.object().shape({
    cupon: yup
      .string()
      .max(100, "Cupon debe ser un string entre 1 y 100 caracteres")
      .optional(),

    proveedor_id: yup
      .number()
      .typeError("El proveedorId debe ser un valor numérico")
      .min(1, "El proveedorId debe ser un número positivo")
      .required("proveedorId obligatorio"),

    vendedor_id: yup
      .number()
      .typeError("El vendedorId debe ser un valor numérico")
      .min(1, "El vendedorId debe ser un número positivo")
      .required("vendedorId obligatorio"),

    items_factura: yup
      .array()
      .of(
        yup.object().shape({
          cantidad_producto: yup
            .number()
            .typeError("La cantidad debe ser un valor numérico")
            .min(1, "La cantidad debe ser mayor a 0")
            .required("cantidad obligatoria"),

          producto_id: yup
            .number()
            .typeError("El productoId debe ser un valor numérico")
            .min(1, "El productoId debe ser un número positivo")
            .required("productoId obligatorio"),
        })
      )
      .min(1, "itemsFactura debe tener al menos un item")
      .required("itemsFactura obligatorio"),
  }),
});

// Función para validar los datos
export const validarCreditoProveedor = async (data) => {
  try {
    const datosValidados = await schemaCuponProveedor.validate(data, {
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
