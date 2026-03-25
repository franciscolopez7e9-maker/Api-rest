import { camisetas } from '../data/db.js';

export const getAllCamisetas = (query) => {
    let result = [...camisetas];

    //Filtrado
    if (query.talla) {
        result = result.filter(c => c.tallas.includes(query.talla));
    }
    if (query.color) {
        result = result.filter(c => c.colores.includes(query.color));
    }
    if (query.tag) {
        result = result.filter(c => c.tags.includes(query.tag));
    }
    if (query.q) {
        const busqueda = query.q.toLowerCase();
        result = result.filter(c =>
            c.nombre.toLowerCase().includes(busqueda) ||
            c.descripcion.toLowerCase().includes(busqueda)
        );
    }

    //Ordenación
    if (query.sort) {
        switch (query.sort) {
            case 'precio_asc':
                result.sort((a, b) => a.precioBase - b.precioBase);
                break;
            case 'precio_desc':
                result.sort((a, b) => b.precioBase - a.precioBase);
                break;
            case 'nombre_asc':
                result.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre_desc':
                result.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                // Retornamos un error si el sort no es reconocido
                return { error: "Parametro sort no reconocido Usa precio_asc, precio_desc, nombre_asc o nombre_des" };
        }
    }

    return { data: result };
};

export const getCamisetaById = (id) => {
    const camiseta = camisetas.find(c => c.id === id);
    if (!camiseta) {
        return { error: "Camiseta no encontrada" };
    }
    return { data: camiseta };
};