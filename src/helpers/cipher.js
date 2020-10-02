const crypto = require("crypto");
//const key='VpO0qDdiNgzXbSkjv9KR6Po8NvKPYkkS'; //chave nao pode estar hardcoded mas por enquanto fica assim
const key = process.env.CIPHER_KEY;

//inicializacao de vetores, strings hexadecimais que torna os valores cifrados unicos
exports.generateIv = () => {
  return crypto.randomBytes(8).toString("hex");
};

//metodo de cifragem
exports.encrypt = (data, iv) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  return cipher.update(Buffer.from(data), "utf8", "hex") + cipher.final("hex");
};
exports.decrypt = (data, iv) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  return decipher.update(data, "hex", "utf8") + decipher.final("utf8");
};