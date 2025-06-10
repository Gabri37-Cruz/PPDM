const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs")

app.get('/', (req, res) => {
  res.render("num")
})

app.get('/result', (req, res) => {
  let c = req.query.c
  let i = req.query.i
  let t = req.query.t
  let juros = (c*i*t)/100
  res.render("resul", {juros})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
