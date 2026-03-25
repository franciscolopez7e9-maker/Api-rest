👕 TeeLab API REST

Esta API permite consultar el catálogo de productos y gestionar los pedidos.

🚀 Cómo arrancar el proyecto:

Instalar las dependencias necesarias:

npm install

Levantar el servidor en modo desarrollo:

npm run dev


El servidor se iniciara y estara escuchando en http://localhost:3000

📍 Lista de Endpoints

📦 Catálogo (Camisetas)

GET /api/camisetas - Obtenemos el catalogo completo y ponemos filtros 

GET /api/camisetas/:id - Devuelve el detalle de una camiseta específica por su ID

🛒 Comandas (Pedidos)

POST /api/comandas - Creamos un nuevo pedido enviando un JSON con cliente, dirección e items.

GET /api/comandas - Obtiene el histórico de todas las comandas creadas

GET /api/comandas/:id - Obtenemos el detalle de un ticket específico
