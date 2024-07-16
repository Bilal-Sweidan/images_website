const express = require('express');
const cors = require('cors');
const session = require('express-session');
const env = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret: 'qwertyuiopasdfghjklzxcvbnm',
    resave:false,
    saveUninitialized: false
}))
const PORT = process.env.PORT || 4000;
// mongoDB connect
mongoose.connect(process.env.DB_URL)
const {Accounts , Images} = require('./DatabaseSchema')
// functions
const hash = require('./functions/Hashing')


// multer
const multer = require('multer')
const path = require('node:path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/images/uploaded_images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage })


// POST  & GET
app.get('/',async (req,res) => {
    const images = await Images.find().limit(20)
    res.json(images)
})


app.post('/register',async (req,res) => {
    try{
        console.log(check_account_exict(req.body))
        if(await check_account_exict(req.body)){
            res.send("this account is alredy exict !!")
        }else{
            add_account(req.body)
            res.send(200)
        }
    }catch(e){
        res.send(e)
    }
})

app.post('/sign-in',async (req,res) => {
    try{
        const user = await check_account_exict(req.body)
        console.log(user);
        console.log(hash.compareHashing(req.body.password,user.password));
        if(user){
            if(hash.compareHashing(req.body.password,user.password)){
                session.user = user;
                res.json(user)
            }else{
                res.send('Wrong Password')
            }
        }else{
            res.send(false)
        }
    }catch(e){
        res.send(e)
    }
})

app.get('/Admin',(req,res) => {
    res.json(session.user)
    console.log(session.user)
})



// imagemin

app.post('/add-images',upload.fields([{ name : 'images'}]),async (req,res) => {
    console.log(req.body)
    const {category}  = req.body
    let categorys = category.split(' ')
    try{
        req.files['images'].forEach(async (data,index) => {
            const imageCh = await Images.findOne({orginal_name : data.originalname})
            if(!imageCh){
                const image =  await Images.create({
                    file_name: data.filename,
                    orginal_name: data.originalname,
                    category: categorys
                })
            }
        })
        res.send(true)
    }catch(e){
        res.send(false)
    }
})


app.post('/more-images',async (req,res,next) => {
    const imagesLenght = req.body.imagesLenght
    const images = await Images.find().limit(imagesLenght + 20).skip(imagesLenght)
    const AllImagesLenght = await Images.find().count()
    console.log(AllImagesLenght)
    console.log(req.body)
    if(imagesLenght == AllImagesLenght){
        res.send("404")
    }else{
        res.json(images);
    }
})


app.post('/search',async (req,res) => {
    const  {searchWord}  = req.body
    console.log(req.body)
    const search_images = await Images.find({"category" : searchWord}).limit(20)
    res.json(search_images);
})




// functions
async function  add_account(data){
    const new_account = await Accounts.create({
        username : data.username,
        password : hash.hashing(data.password)
    }) 
    console.log(new_account)
}

async function check_account_exict(data){
    const account = await Accounts.findOne({username : data.username})
    if(account){
        return account
    }else{
        return false;
    }
}




app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})
