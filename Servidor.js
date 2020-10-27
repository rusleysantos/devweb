const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

const servidor = express();

servidor.use(bodyParser.urlencoded({ extended: true }));

servidor.use(express.static(path.join(__dirname, 'public')));

servidor.set('view engine', 'ejs');

const clientes = require('./Clientes')
// servidor.use('/clientes', clientes)
servidor.use(clientes)

servidor.get('/', (req,res) => {
    // res.send('Servidor OK');
    res.redirect('/clientes')
});

servidor.listen(8080,()=>{ console.log('Rodando Servidor CRUD...'); })