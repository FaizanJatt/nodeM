const express = require("express")
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const serverless = require('serverless-http');
const app = express();
let dotenv = require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


const router = express.Router();
const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})

const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    secure:true,
    auth:{
        user:process.env.USER,
        pass: process.env.PASS
    },
})


router.get("/", (req,res)=>{
    res.send('<h1>Send a post request to this link with the fields [name, email , num and message]</h1>')
})


router.post('/', (req,res)=>{
    const {name,email,num,message} = req.body;
    if(!name || !email || !num || !message) return
    const mailData = {
        from: process.env.USER,
        to: 'info@redpositive.in',
        subject:`You were contacted by ${name} `,
        text: "contacted By someone",
        html: `<b> Hey there! </b><br> You were contacted by someone </br>
        <br> Name: ${name}</br>
        <br> Email: ${email}</br>
        <br> Phone Number: ${num}</br>
        <br> Message: ${message}</br>
        `
    }
    console.log(mailData)
    
    transporter.sendMail(mailData, (err,info)=>{
        if(err) return console.log(err);
        res.status(200).send({message:"Mail sent", message_id:info.messageId})
    })
})


app.use("/api", router)

