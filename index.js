const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = 3000;

let cartones = [];
let contador = 1; // variable para generar números de serie secuenciales


// Generar 5 cartones al levantar el servicio
for (let i = 0; i < 5; i++) {
  const numeros = generarNumeros();
  const serie = uuidv4();
  cartones.push({ numeros, serie });
}

// Ruta GET para obtener la lista completa de cartones
app.get('/cartones', (req, res) => {
  res.json(cartones);
});

// Ruta POST para crear un nuevo cartón
app.post('/cartones', (req, res) => {
  const numeros = generarNumeros();
  const serie = uuidv4();
  cartones.push({ numeros, serie });
  res.status(201).json({ numeros, serie });
});

// Función para generar 15 números aleatorios entre 1 y 30
function generarNumeros() {
  let numeros = [];
  while (numeros.length < 15) {
    const numero = Math.floor(Math.random() * 30) + 1;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }
  return numeros;
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


// Configurar Express para servir archivos estáticos desde la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));



