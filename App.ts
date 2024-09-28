// src/App.ts
import express from 'express';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Test servidor test');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en staging main http://localhost:${port}`);
});
