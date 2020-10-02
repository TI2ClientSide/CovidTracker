const userService = require("../services/user-mongodb.js");
const jwt = require("../helpers/jwt.js");

exports.register = (req, res) => {
  userService
    .register(req.body.username, req.body.password, req.body.role)
    .then(() => res.status(200).json({ success: true }))
    .catch((message) => res.status(500).send(message));
};
exports.login = (req, res) => {
  userService
    .authenticate(req.body.username, req.body.password)
    .then((payload) => jwt.createToken(payload))
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error.message));
};

exports.getInfetados = (req, res) => {
  userService
    .getInfetados(req.client)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.addInfetados = (req, res) => {
  userService
    .addInfetados(req.client, req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).send(err.message));
};

exports.removeInfetados = (req, res) => {
  userService
    .removeInfetados(req.client, req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).send(err.message));
};

exports.getUsers = (req, res) => {
  userService
    .getUsers(req.client)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err.message));
};

exports.deleteUser = (req, res) => {
  userService
    .deleteUser(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).send(err.message));
};