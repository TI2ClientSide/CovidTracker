const infetadoService = require('../services/infetados-mongodb.js');


exports.getInfetados = (req, res) => {
    infetadoService
        .getInfetados(req.query)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getInfetadosLocal = (req, res) => {
    infetadoService
        .getInfetadosLocal(req.query)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getInfetado = (req, res) => {
    infetadoService
        .getInfetado(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postInfetado = (req, res) => {
    console.log(req.body)
    infetadoService
        .insertInfetado(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putInfetado = (req, res) => {
    infetadoService
        .updateInfetado(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteInfetado = (req, res) => {
    infetadoService
        .deleteInfetado(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};
