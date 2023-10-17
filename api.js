const express = require("express")
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const serverless = require('serverless-http');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


const router = express.Router();
const port = process.env.PORT || 5000;

// app.use("/api", router);


// app.use("/v1", router);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})

const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    secure:true,
    // service:"Gmail",
    auth:{
        user:'kaoruhashiga@gmail.com',
        
        // pass: 'Wellfound',
        pass: "evve umwv rexv elqr"
    },
})


router.get("/", (req,res)=>{
    res.send('<h1>hii</h1>')
})
router.get("/text-mail", (req,res)=>{
    res.send("<h1>FK</h1>")
})

router.post('/text-mail', (req,res)=>{
    const {text} = req.body;
    const mailData = {
        from: 'kaoruhashiga@gmail.com',
        to: 'xmuhammadfaizanx@gmail.com',
        subject:"Contacted By",
        text: text,
        html: '<b> Hey there! </b><br> This is our first message sent with nodemailer</br>'
    }
    
    transporter.sendMail(mailData, (err,info)=>{
        console.log(mailData,info)
        if(err) return console.log(err);
        res.status(200).send({message:"Mail sent", message_id:info.messageId})
    })
})


app.use("/", router)

// module.exports.handler = serverless(app);