import express from 'express';
import cors from 'cors';

// Importación de las rutas
import camisetasRoutes from './routes/camisetas.routes.js';
import comandasRoutes from './routes/comandas.routes.js';

const app = express();
const PORT = 3000;


// Permite aceptar peticiones de otros dominios
app.use(cors());
// body a JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rutas

app.use('/api/camisetas', camisetasRoutes);
app.use('/api/comandas', comandasRoutes);

// Endpoint de prueba
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API REST');
});


app.use((err, req, res, next) => {
    console.error("Error interno:", err.stack);
    res.status(500).json({ error: "Ha ocurrido un error interno en el servidor" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Arrancar el Servidor

app.listen(PORT, () => {
    console.log(`🚀 Servidor de TeeLab corriendo en http://localhost:${PORT}`);
    console.log(`👉 Prueba el catalogo en: http://localhost:${PORT}/api/camisetas`);
});