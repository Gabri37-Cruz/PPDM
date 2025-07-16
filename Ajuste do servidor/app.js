const express = require("express")
const app = express()
const porta = 7012

app.use(express.urlencoded({ extended: true }))

app.set("view engine","ejs")

const rotaResultado = app.route("/resultado")

app.get("/", (req, res)=>{
res.render("index")
})

rotaResultado.get((req, res)=>{
    res.redirect("/")
})

rotaResultado.post((req, res)=>{
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let operacao = req.body.operacao
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