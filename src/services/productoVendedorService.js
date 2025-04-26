import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import axios from "axios";

export const publicarProductoVendedor = (productoInfo) => {
    const publicarProducto = axios.post(
        `${ApiConfig.urlApi}/productoVendedor/publicar`,
        {
            ...productoInfo
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return publicarProducto;
}

export const despublicarProductoVendedor = (productoInfo) => {
    const despublicarProducto = axios.post(
        `${ApiConfig.urlApi}/productoVendedor/despublicar`,
        {
            ...productoInfo
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return despublicarProducto;
}

export const editarPrecioProductoVendedor = (productoInfo) => {
    const editarPrecioProducto = axios.post(
        `${ApiConfig.urlApi}/productoVendedor/actualizarPrecio`,
        {
            ...productoInfo
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return editarPrecioProducto;
}

export const obtenerProductosPublicados = () => {
    const productosPublicados = axios.get(
        `${ApiConfig.urlApi}/productoVendedor/publicados`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    );

    return productosPublicados;
};

// Nueva función para obtener productos por vendedor_id
export const obtenerProductosPorVendedorId = (vendedorId) => {
    const productosPorVendedor = axios.get(
        `${ApiConfig.urlApi}/productoVendedor/vendedor/${vendedorId}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    );

    return productosPorVendedor;
};

