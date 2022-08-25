const { Router } = require('express');
const nodemailer = require('nodemailer')
const router = Router();
const {NMAILER_PASSWORD} = process.env;

router.post('/sendemail',async(req,res)=>{
    const {owner_email, adopter_email, adopter_telephone, message, adopter_username, adopter_name} = req.body

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
        <li>Nombre:${adopter_name}</li>
        <li>Nombre de usuario:${adopter_username}</li>
        <li>Email:${adopter_email}</li>
        <li>Telefono:${adopter_telephone}</li>
    </ul>
    <p>${message}</p>`

    let info = await transporter.sendMail({
        from:"'HappyTails'<HAppYTAil5@hotmail.com>",
        to: owner_email,
        subject:'Formulario de contacto adopcion',
        html: contentHTML
        })

    console.log('message sent', info.messageId)
    res.send('se envio correctamente')
})
module.exports = router;