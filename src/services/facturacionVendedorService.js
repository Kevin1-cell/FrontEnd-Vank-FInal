import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import axios from "axios";

export const crearFacturaVendedor = (factura) => {
    const crearFactura = axios.post(
        `${ApiConfig.urlApi}/facturaVendedor`,
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

export const obtenerFacturaVendedor = (id) => {

    const obtenerFactura = axios.get(
        `${ApiConfig.urlApi}/facturaVendedor/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerFactura;
}

export const obtenerFacturasCliente = (id) => {
    const obtenerFacturas = axios.get(
        `${ApiConfig.urlApi}/facturaVendedor/cliente/${id}`,
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
        `${ApiConfig.urlApi}/facturaVendedor/vendedor/${id}`,
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
        `${ApiConfig.urlApi}/facturaVendedor/items/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerItemsFactura;
}