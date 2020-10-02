const db = require("../configs/mongodb").getDB();
const cipher = require("../helpers/cipher");
const roles = require("../helpers/roles");
const ObjectId =require("mongodb").ObjectID;

exports.register = (username, rawPassword, role) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('users').findOne({ username: username }).then((found) => {
        if (!found) {
          if (Object.values(roles).indexOf(role) > -1) {
            if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
              const dataIv = cipher.generateIv();
              const password = cipher.encrypt(rawPassword, dataIv);
              db.collection('users').insertOne({ username, password, role, dataIv,infetados:[] })
                .then(() => resolve())
                .catch((error) => reject(error.message));
            } else reject('invalid password');
          } else reject('invalid role');
        } else reject('username already in use');
      }).catch((error) => reject(error.message));
    } catch (error) { reject(error.message); }
  });
};

exports.authenticate = (username, rawPassword) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ username: username })
      .then((user) => {
        if (user) {
          const password = cipher.decrypt(user.password, user.dataIv);
          if (password == rawPassword) resolve({ _id: user._id, role: user.role });
        }
        reject(new Error("username and password don't match"));
      })
      .catch((error) => reject(error));
  });
};

//regex=pelo menos uma maiuscula,pelo menos um miniscula, um digito, e um daqueles caracteres, pelo menos 8 de tamanho, sem limite

exports.getInfetados = (userId) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .findOne({ _id: ObjectId(userId) })
      .then((user) => {
        if (user.infetados) {
          return db.collection("infetados")
            .find({ _id: { $in: user.infetados } })
            .project({ Nome: 1, Idade: 1, Sexo: 1, Local: 1 ,Estado: 1, Sintomas: 1 })
            .toArray();
        } else return [];
      })
      .then((infetados) => resolve(infetados))
      .catch((err) => reject(err));
  });
};

exports.addInfetados = (userId, infetadoId) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne({ _id: ObjectId(userId) }, { $push: { infetados: ObjectId(infetadoId) } })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

exports.removeInfetados = (userId, infetadoId) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .updateOne({ _id: ObjectId(userId) }, { $pull: { infetados: ObjectId(infetadoId) } })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

exports.getUsers=()=> {
  return new Promise((resolve, reject) => {
      db
          .collection('users')
          .find()
          .project({ username:1,role:1})
          .toArray()
          .then(users => resolve(users))
          .catch(err =>reject(err));
  });
};

exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
      db
          .collection('users')
          .deleteOne(
              { _id: ObjectId(userId) })
          .then(() => resolve({ removed: 1 }))
          .catch(err => reject(err));
  });
};