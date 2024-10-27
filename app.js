const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;

app.use(express.json());

let libri = [];

// GET: /api/libri
app.get('/api/libri', (req, res) => {
    res.json(libri);
});

// GET: /api/libri/:codice
app.get('/api/libri/:codice', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
        res.json(libro);
    } else {
        res.status(404).send('Libro non trovato');
    }
});

// POST: /api/libri
app.post('/api/libri', (req, res) => {
    const { nome, descrizione, quantita, prezzo, autore } = req.body;
    const nuovoLibro = {
        codice: uuidv4(),
        nome,
        descrizione,
        quantita,
        prezzo,
        autore
    };
    libri.push(nuovoLibro);
    res.status(201).json(nuovoLibro);
});

// DELETE: /api/libri/:codice
app.delete('/api/libri/:codice', (req, res) => {
    const index = libri.findIndex(l => l.codice === req.params.codice);
    if (index !== -1) {
        libri.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Libro non trovato');
    }
});

// GET: /api/libri/:codice/incrementa
app.get('/api/libri/:codice/incrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
        libro.quantita += 1;
        res.json(libro);
    } else {
        res.status(404).send('Libro non trovato');
    }
});

// GET: /api/libri/:codice/decrementa
app.get('/api/libri/:codice/decrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
        if (libro.quantita > 0) {
            libro.quantita -= 1;
            res.json(libro);
        } else {
            res.status(400).send('Quantità non sufficiente');
        }
    } else {
        res.status(404).send('Libro non trovato');
    }
});

app.listen(port, () => {
    console.log(`API in ascolto su http://localhost:${port}`);
});
