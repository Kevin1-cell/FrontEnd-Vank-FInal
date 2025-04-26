import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import axios from "axios";

export const crearCuponVendedor = (cupon) => {
    const crearCupon = axios.post(
        `${ApiConfig.urlApi}/cuponVendedor/crear`,
        {
            ...cupon
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return crearCupon;
}

export const obtenerCuponPorVendedorYNombre = (id,nombre) => {
    const obtenerCupon = axios.get(
        `${ApiConfig.urlApi}/cuponVendedor/${nombre}/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerCupon;
}

export const eliminarCuponPorVendedorYNombre = (id,nombre) => {
    const obtenerCupon = axios.delete(
        `${ApiConfig.urlApi}/cuponVendedor/${nombre}/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerCupon;
}
