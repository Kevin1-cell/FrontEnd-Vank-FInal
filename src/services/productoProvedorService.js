import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import axios from "axios";

export const crearProductoProveedor = (producto)=> {
    const crearProducto = axios.post(
        `${ApiConfig.urlApi}/productoProvedor`,
        {
            ...producto
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )
    
    return crearProducto;
}

export const obtenerProductoPorId = (id) => {
    const obtenerProducto = axios.get(
        `${ApiConfig.urlApi}/productoProvedor/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )
    
    return obtenerProducto;
}

export const obtenerProductosPorProvedorId = (id) => {
    const obtenerProductos = axios.get(
        `${ApiConfig.urlApi}/productoProvedor/provedor/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )
    
    return obtenerProductos;
}

export const obtenerPorPalabraClave = (palabra) => {
    console.log(`${ApiConfig.urlApi}/productoProvedor/buscarPalabra?palabraClave=${palabra}`)
    const obtenerProductos = axios.get(
        `${ApiConfig.urlApi}/productoProvedor/buscarPalabra?palabraClave=${palabra}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )
    
    return obtenerProductos;
}

export const editarProductoProveedor = (producto) => {
    const editarProducto = axios.put(
        `${ApiConfig.urlApi}/productoProvedor`,
        {
            ...producto
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )
    
    return editarProducto;
}
