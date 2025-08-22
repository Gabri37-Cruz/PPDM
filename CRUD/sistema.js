const express = require("express");
const fs = require("fs");
const app = express();
const porta = 7012;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const arquivo = "dados.json";

// Função auxiliar para carregar dados
function carregarDados() {
  if (!fs.existsSync(arquivo)) return [];
  let conteudo = fs.readFileSync(arquivo, "utf8");
  return conteudo ? JSON.parse(conteudo) : [];
}

// Função auxiliar para salvar dados
function salvarDados(dados) {
  fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
}

// Rota inicial (cadastro)
app.get("/", (req, res) => {
  res.render("cadastro");
});

// CREATE - Salvar usuário
app.post("/create", (req, res) => {
  let usuarios = carregarDados();

  let novoUsuario = {
    id: Date.now(),
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    idade: req.body.idade,
    cidade: req.body.cidade,
  };

  usuarios.push(novoUsuario);
  salvarDados(usuarios);

  res.render("sucesso", { usuario: novoUsuario });
});

// READ - Listar todos os usuários
app.get("/usuarios", (req, res) => {
  let usuarios = carregarDados();
  res.render("lista", { usuarios });
});

// UPDATE - Formulário de edição
app.get("/editar/:id", (req, res) => {
  let usuarios = carregarDados();
  let id = parseInt(req.params.id);

  let usuario = usuarios.find((u) => u.id === id);
  if (usuario) {
    res.render("editar", { usuario });
  } else {
    res.send("Usuário não encontrado!");
  }
});

// UPDATE - Receber alterações
app.post("/update/:id", (req, res) => {
  let usuarios = carregarDados();
  let id = parseInt(req.params.id);

  let index = usuarios.findIndex((u) => u.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...req.body, id }; // mantém id fixo
    salvarDados(usuarios);
    res.redirect("/usuarios");
  } else {
    res.send("Usuário não encontrado!");
  }
});

// DELETE - Remover um usuário pelo ID
app.get("/delete/:id", (req, res) => {
  let usuarios = carregarDados();
  let id = parseInt(req.params.id);

  let novosUsuarios = usuarios.filter((u) => u.id !== id);
  salvarDados(novosUsuarios);

  res.redirect("/usuarios");
});

app.listen(porta, () => {
  console.log("O app está rodando na porta: http://localhost:" + porta);
});
