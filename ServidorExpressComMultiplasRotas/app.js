const express = require("express")
const app = express()
const porta = 7012

app.set("view engine","ejs")

app.get("/", (req, res)=>{
res.render("index")
})

app.get("/", (req, res)=>{

})

app.listen(porta, ()=>{
    console.log("O app está rodando na porta: http://localhost:"+porta)
})