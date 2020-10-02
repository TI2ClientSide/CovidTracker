const jwt = require("jsonwebtoken");
//const key = 'kfjkjURWojajjvclsC3pUUo8gb6A3omh'; //nao pode estar hardcoded mas por enquanto fica
const key = process.env.JWT_KEY;

exports.createToken = (payload) => {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: "8h", issuer: "CovidTracker" }; //nome meramente informativo
    jwt.sign(payload, key, options, (error, token) => {
      if (error) reject(error);
      else resolve({ token, ...payload });
    });
  });
};
exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    let options = { issuer: "CovidTracker" };
    jwt.verify(token, key, options, (error, payload) => {
      if (error) reject(error);
      else resolve(payload);
    });
  });
};