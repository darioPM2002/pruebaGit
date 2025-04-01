
//Se importa paquete que instalamos de express
import express from "express";

import fs from "fs";

//Se crea nueva aplicación, con la  instancia del paquete
const app = express()

//Definir puerto
const port = 3000

//Se le dice a la aplicación que queremos que ocupe json
app.use(express.json())

//Definir endpoints
app.get("/person", (req,res)=>{
    const person ={
        "name": "Dario",
        "email": "a01785420@tec.mx"
    }
    res.json(person)


})
app.get('/', (req, res)=>
    {
        fs.readFile('./html/home.html', 'utf8', 
        (err, html) => {
            if(err)
            {
                res.status(500).send('There was an error: ' + err)
                return 
            }
            
            console.log("Sending page...")
            res.send(html)
            console.log("Page sent!")
        })
    })




app.listen(port,()=>{
    console.log('example app listenign '+port)
})