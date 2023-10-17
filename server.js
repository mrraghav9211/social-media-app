const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

// --------- importing routes -----------
const post = require('./routes/post');
const user = require('./routes/user');

const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})

const PORT = process.env.PORT || 4000
connectDatabase();
// ----------- using middleware ------------
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('hello world');
})

// -------- using routes ---------
app.use('/api/v1', post);
app.use('/api/v1', user);


app.listen(PORT, (err)=>{
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

