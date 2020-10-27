
const express = require('express');
const router = express.Router();
const dados = require('./Dados');


router.get('/clientes', async (req, res) => {
    // res.send("entrou em /clientes")
    let cli = new dados.Cliente();
    res.render('index', { cliente: cli, lista: await dados.GetListaClientes(), postBack: false });
})

router.get('/clientes/:id', async (req, res) => {
    let id = req.params.id;
    let cli = dados.CarregaClientePorCodigo(id);
    res.render('index', { cliente: cli, lista: await dados.GetListaClientes(), postBack: false });
})

router.post('/clientes/del/:id', async (req, res) => {
    let id = req.params.id;
    await dados.DeletaClientePorCodigo(id);
    res.redirect('/clientes');
})

router.post('/clientes', async (req, res) => {
    var erros = [];
    var erroMsg = '';
    let cli = new dados.Cliente();

    cli.codigo = req.body.codigo;
    cli.nome = req.body.nome;
    cli.sobre = req.body.sobre;
    cli.email = req.body.email;
    cli.senha = req.body.senha;
    cli.cpf = req.body.cpf;
    cli.rg = req.body.rg;
    cli.estadoCivil = req.body.estadoCivil;
    cli.sexo = req.body.sexo;
    cli.telefone = req.body.telefone;
    cli.nascimento = req.body.nascimento;
    cli.cep = req.body.cep;
    cli.endereco = req.body.endereco;

    if (cli.codigo != ''
        && cli.nome != ''
        && cli.sobre != ''
        && cli.email != ''
        && cli.senha != '') {
        await dados.AddClientes(cli);
        cli = new dados.Cliente();
    }

    res.render('index', { cliente: cli, lista: await dados.GetListaClientes(), erroMsg: erroMsg, postBack: true });
});

module.exports = router;