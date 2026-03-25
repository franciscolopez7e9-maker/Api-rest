let productos;

function init() {
    // Asegúrate de que 'productosJSON' existe en productos.js
    productos = JSON.parse(productosJSON);
    muestraProductos();
}

function muestraProductos() {
    const container = document.getElementById('productos-container');

    productos.forEach(producto => {
        const article = crearArticulo(producto);
        container.appendChild(article);
    });
}

function crearArticulo(producto) {
    const article = document.createElement('article');
    article.className = 'producto';

    // Se asume que producto.imagenes es un objeto y colores un array
    const img = crearImagen(producto);
    const h2 = crearTitulo(producto.nombre);
    const p = crearDescripcion(producto.descripcion);
    const precio = crearPrecio(producto.precioBase);
    const labelTalla = crearLabel('Talla:');
    const selectTalla = crearSelectTalla(producto.tallas);
    const labelColor = crearLabel('Color:');
    const selectColor = crearSelectColor(producto.colores);

    const labelCantidad = crearLabel('Cantidad:');
    const inputCantidad = crearInputCantidad();
    const button = crearBoton();

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(precio);
    article.appendChild(labelTalla);
    article.appendChild(selectTalla);
    article.appendChild(labelColor);
    article.appendChild(selectColor);
    article.appendChild(labelCantidad);
    article.appendChild(inputCantidad);
    article.appendChild(button);

    return article;
}

function crearImagen(producto) {
    const img = document.createElement('img');
    // Carga la imagen correspondiente al primer color disponible
    img.src = producto.imagenes[producto.colores[0]];
    img.alt = producto.nombre;
    return img;
}

function crearTitulo(nombre) {
    const h2 = document.createElement('h2');
    h2.textContent = nombre;
    return h2;
}

function crearDescripcion(texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    return p;
}

function crearPrecio(precio) {
    const p = document.createElement('p');
    p.className = 'precio';
    p.textContent = precio.toFixed(2) + '€';
    return p;
}

function crearLabel(texto) {
    const label = document.createElement('label');
    label.textContent = texto;
    return label;
}

function crearSelectTalla(tallas) {
    const select = document.createElement('select');

    tallas.forEach(talla => {
        const option = document.createElement('option');
        option.value = talla;
        option.textContent = talla;
        select.appendChild(option);
    });

    return select;
}

function crearSelectColor(colores) {
    const select = document.createElement('select');

    colores.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color;
        select.appendChild(option);
    });

    return select;
}

function crearInputCantidad() {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = '0';
    input.min = '0';
    return input;
}

function crearBoton() {
    const button = document.createElement('button');
    button.textContent = 'AÑADIR AL CARRITO';

    button.addEventListener('click', function() {
        alert('Añadido al carrito');
    });

    return button;
}