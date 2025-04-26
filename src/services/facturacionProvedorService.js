import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import axios from "axios";

export const crearFacturaProveedor = (factura) => {

    console.log(factura)
    const crearFactura = axios.post(
        `${ApiConfig.urlApi}/facturacion`,
        {
            ...factura
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return crearFactura;
}

export const obtenerFacturaProvedor = (id) => {

    const obtenerFactura = axios.get(
        `${ApiConfig.urlApi}/facturacion/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerFactura;
}

export const obtenerFacturasProvedor = (id) => {
    const obtenerFacturas = axios.get(
        `${ApiConfig.urlApi}/facturacion/proveedor/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerFacturas;
}

export const obtenerFacturasVendedor = (id) => {
    const obtenerFacturas = axios.get(
        `${ApiConfig.urlApi}/facturacion/vendedor/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )
    return obtenerFacturas;
}

export const obtenerItemsFactura = (id) => {
    const obtenerItemsFactura = axios.get(
        `${ApiConfig.urlApi}/facturacion/items/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerItemsFactura;
}