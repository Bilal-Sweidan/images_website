const multer = require('multer')
const path = require('node:path')
const storage1 = multer.diskStorage({
    destination: (req,file,callback) => {
        callback('../../client/src/images/uploaded_images')
    },
    filename : (req,file,callback) => {
        callback(null,Data.now() + path.extname(file.originalname()))
    }
})

const fileStore = multer({ storage1 })


module.exports = {
    fileStore
}