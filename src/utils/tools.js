const bcrypt = require("bcrypt");

module.exports.hash = (data) => {
    return bcrypt.hash(data, 10);
}