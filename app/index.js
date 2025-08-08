const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos del build de React
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor React corriendo en http://localhost:${port}`);
});
