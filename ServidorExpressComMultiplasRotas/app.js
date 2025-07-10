const express = require("express")
const app = express()
const porta = 7012

app.set("view engine","ejs")

app.get("/", (req, res)=>{
res.render("index")
})

app.get("/resultado", (req, res)=>{
    let num1 = Number(req.query.num1)
    let num2 = Number(req.query.num2)
    let operacao = req.query.operacao
    let total 

    if(operacao == "+"){
        total = num1+num2
    }
    else if(operacao == "-"){
        total = num1-num2
    } 
    else if(operacao == "*"){
        total = num1*num2
    }
    else if(operacao == "/"){
        total = num1/num2
    }

    res.render("resultado", {total})
})

app.listen(porta, ()=>{
    console.log("O app está rodando na porta: http://localhost:"+porta)
})