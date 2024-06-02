const bcrypt = require("bcryptjs")

async function encryptPassword(password) {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
}

module.exports = {encryptPassword};