const express = require('express')
const app = express();
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const cors = require('cors')
const { register, updateUser } = require('./controller/user');
const multer = require('multer')
require("dotenv").config()

const port = process.env.PORT;
app.use(cors());
app.use(express.json());


const upload = multer({ storage: multer.diskStorage({}) })

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Server connected to database");
    })
    .catch((error) => {
        console.log("Could not connect to database Something went wrong!", error);
    })

app.post('/api/user/adduser', upload.single('picture'), register)
app.patch('/api/user/updateuser', upload.single('picture'), updateUser)
app.use('/api/user', userRouter)


app.listen(port, () => {
    console.log("server up and running at", port);
})