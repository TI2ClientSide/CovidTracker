const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;

exports.getInfetados = (queryString) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (queryString.search) {
            filter.Nome = { $regex: new RegExp(queryString.search, "i") };
        }
        db
            .collection('infetados')
            .find(filter)
            .project({ Nome: 1, Idade: 1, Sexo: 1, Local: 1, Estado: 1, Sintomas: 1 })
            .toArray()
            .then(infetados => resolve(infetados))
            .catch(err => reject(err));
    });
};

exports.getInfetadosLocal = (queryString) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (queryString.search) {
            filter.Local = { $regex: new RegExp(queryString.search, "i") };
        }
        db
            .collection('infetados')
            .find(filter)
            .project({ Nome: 1, Idade: 1, Sexo: 1, Local: 1, Estado: 1, Sintomas: 1 })
            .toArray()
            .then(infetados => resolve(infetados))
            .catch(err => reject(err));
    });
};


exports.getInfetado = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('infetados')
            .findOne({ _id: ObjectId(id) })
            .then(infetado => resolve(infetado))
            .catch(err => reject(err));
    });
};

exports.insertInfetado = body => {
    return new Promise((resolve, reject) => {
        console.log(body)
        db
            .collection('infetados')
            .insertOne({
                Nome: body.Nome,
                Idade: body.Idade,
                Sexo: body.Sexo,
                Local: body.Local,
                Estado: body.Estado,
                Sintomas: body.Sintomas,
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateInfetado = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('infetados')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        Nome: body.Nome,
                        Idade: body.Idade,
                        Sexo: body.Sexo,
                        Local: body.Local,
                        Estado: body.Estado,
                        Sintomas: body.Sintomas,
                    },
                }
            )
            .then(() => resolve({ updated: 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteInfetado = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('infetados')
            .deleteOne(
                { _id: ObjectId(id) })
            .then(() => resolve({ removed: 1 }))
            .catch(err => reject(err));
    });
};

