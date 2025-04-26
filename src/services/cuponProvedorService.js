import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import axios from "axios";

export const crearCuponProveedor = (cupon) => {
    const crearCupon = axios.post(
        `${ApiConfig.urlApi}/cuponProvedor/crear`,
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

export const obtenerCuponPorProvedorYNombre = (id,nombre) => {
    const obtenerCupon = axios.get(
        `${ApiConfig.urlApi}/cuponProvedor/${nombre}/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerCupon;
}

export const eliminarCuponPorProvedorYNombre = (id,nombre) => {
    const obtenerCupon = axios.delete(
        `${ApiConfig.urlApi}/cuponProvedor/${nombre}/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerCupon;
}