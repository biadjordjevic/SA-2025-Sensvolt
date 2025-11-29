const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// =============================
// LOGIN E CADASTRO
// =============================

// Cadastro de usuário
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await pool.query(
      `INSERT INTO usuario (nome, email, senha)
       VALUES ($1, $2, $3) RETURNING usuario_id, nome, email`,
      [nome, email, senhaHash]
    );

    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ erro: "Email não encontrado" });

    const user = result.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta)
      return res.status(401).json({ erro: "Senha incorreta" });

    res.json({
      usuario_id: user.usuario_id,
      nome: user.nome,
      email: user.email
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// =============================
// CRUD DE APARELHOS
// =============================

// Criar aparelho
app.post("/aparelhos", async (req, res) => {
  const {
    nome,
    modelo,
    codigo,
    descricao,
    consumo_maximo,
    temp_min,
    temp_max,
    usuario_id
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO aparelho 
       (nome, modelo, codigo, descricao, consumo_maximo, temp_min, temp_max, usuario_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        nome,
        modelo,
        codigo,
        descricao,
        consumo_maximo,
        temp_min,
        temp_max,
        usuario_id
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Listar aparelhos
app.get("/aparelhos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM aparelho ORDER BY aparelho_id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// =============================
// SUPORTE
// =============================
app.post("/suporte", async (req, res) => {
  const { nome, contato } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO suporte (nome, contato)
       VALUES ($1, $2) RETURNING *`,
      [nome, contato]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// =============================
// INICIAR SERVIDOR
// =============================
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
