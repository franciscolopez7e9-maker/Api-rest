import { comandas, camisetas } from '../data/db.js';

export const createComanda = (body) => {
    //Validaciones
    if (!body.cliente || !body.cliente.nombre || body.cliente.nombre.length < 2) {
        return { error: "El nombre del cliente es obligatorio y debe tener al menos 2 caracteres." };
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.cliente.email || !emailRegex.test(body.cliente.email)) {
        return { error: "El email del cliente es obligatorio y debe tener un formato válido" };
    }

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
        return { error: "La comanda debe tener al menos 1 item" };
    }

    let totalPedido = 0;
    const itemsProcesados = [];

    // Validar cada item del pedido
    for (let i = 0; i < body.items.length; i++) {
        const item = body.items[i];

        if (!Number.isInteger(item.cantidad) || item.cantidad < 1) {
            return { error: `La cantidad del artículo '${item.camisetald || 'desconocido'}' debe ser un entero mayor o igual a 1` };
        }

        const camiseta = camisetas.find(c => c.id === item.camisetald);
        if (!camiseta) {
            return { error: `La camiseta con ID '${item.camisetald}' no existe en el catálogo` };
        }

        if (!camiseta.tallas.includes(item.talla)) {
            return { error: `La talla '${item.talla}' no está disponible para la camiseta '${camiseta.nombre}'.` };
        }

        if (!camiseta.colores.includes(item.color)) {
            return { error: `El color '${item.color}' no está disponible para la camiseta '${camiseta.nombre}'.` };
        }

        // Cálculos
        const subtotal = camiseta.precioBase * item.cantidad;
        totalPedido += subtotal;

        itemsProcesados.push({
            camisetald: camiseta.id,
            nombre: camiseta.nombre,
            talla: item.talla,
            color: item.color,
            cantidad: item.cantidad,
            precioUnitario: camiseta.precioBase,
            subtotal: Number(subtotal.toFixed(2))
        });
    }

    //Generar el Ticket

    const nuevoId = `ORD-${String(comandas.length + 1).padStart(4, '0')}`;

    const nuevaComanda = {
        id: nuevoId,
        fecha: new Date().toISOString(),
        estado: "recibida",
        cliente: body.cliente,
        direccion: body.direccion || { calle: "Recogida en tienda", cp: "08001", ciudad: "Barcelona" },
        items: itemsProcesados,
        total: Number(totalPedido.toFixed(2))
    };

    // Guardar en memoria
    comandas.push(nuevaComanda);

    return { data: nuevaComanda };
};

export const getAllComandas = () => {
    return { data: comandas };
};

export const getComandaById = (id) => {
    const comanda = comandas.find(c => c.id === id);
    if (!comanda) {
        return { error: "Comanda no encontrada" };
    }
    return { data: comanda };
};