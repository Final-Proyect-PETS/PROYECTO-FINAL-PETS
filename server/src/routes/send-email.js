const { Router } = require('express');
const nodemailer = require('nodemailer')
const router = Router();
const {NMAILER_PASSWORD} = process.env;

router.post('/sendemail',async(req,res)=>{
    const {email, telephone, message, username, name} = req.body

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

    let contentHTML=`
    <img src = "https://cdn-icons-png.flaticon.com/512/194/194279.png" style="width:100px;"/>
    <h1>Info del usuario</h1> 
    <ul>
        <li>Nombre:${name}</li>
        <li>Nombre de usuario:${username}</li>
        <li>Email:${email}</li>
        <li>Telefono:${telephone}</li>
    </ul>
    <p>${message}</p>`

    let info = await transporter.sendMail({
        from:"'HappyTails'<HAppYTAil5@hotmail.com>",
        to: email,
        subject:'Formulario de contacto adopcion',
        html: contentHTML
        })

    console.log('message sent', info.messageId)
    res.send('se envio correctamente')
})
module.exports = router;