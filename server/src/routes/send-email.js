const { Router } = require('express');
const nodemailer = require('nodemailer')
const Pets = require("../../models/pets");
const User = require("../../models/users");
const router = Router();
const {NMAILER_PASSWORD} = process.env;

router.post('/send-email',async(req,res)=>{
    const {first_name, email,telephone,message,username,name} = req.body

    let Dataform= User


    let transporter = nodemailer.createTransport({
        host:'smtp-mail.outlook.com',
        port: 587,  
        secure: false,
        auth:{
            user: 'HAppYTAil5@hotmail.com',
            pass: `${NMAILER_PASSWORD}`

        },
        tls:{
            rejectUnauthorized: false
        }
    })

    let info = await transporter.sendMail({
        from:"'HappyTails'<HAppYTAil5@hotmail.com>",
        to: email,
        subject:'formulario de contacto adopcion',
        text:'esto es otra prueba'
    })

    console.log('message sent', info.messageId)
    res.send('se envio correctamente')
})

module.exports = router;