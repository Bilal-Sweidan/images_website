const bcrypt = require('bcryptjs');
function hashing(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt)
}

function compareHashing(raw,hashed){
    return bcrypt.compareSync(raw,hashed)
}

module.exports = {
    hashing,
    compareHashing
}
