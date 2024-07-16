const mongoose = require('mongoose')

const Account = new mongoose.Schema({
    username : {
        type: String,
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default: 'User',
        required : true,
    },
    data_ID: mongoose.Types.ObjectId
}) 

const user_data = new mongoose.Schema({

})

const Image = new mongoose.Schema({
    file_name: String,
    orginal_name: String,
    category: [String],
})

const Accounts = mongoose.model('accounts',Account)
const Images = mongoose.model('images',Image)
module.exports = {
    Accounts,
    Images,
}