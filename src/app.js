const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

require("dotenv").config();

const app = express();
const port = 5433;

app.use(bodyParser.json());

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));

app.post("/agendar", (req, res) => {
  const { nome, telefone, data, hora } = req.body;

  if (!nome || !telefone || !data || !hora) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const query = `INSERT INTO agendamentos (nome, telefone, data, hora) VALUES ($1, $2, $3, $4) RETURNING id`;
  const values = [nome, telefone, data, hora];

  client
    .query(query, values)
    .then((result) => {
      res.status(201).json({ message: "Agendamento realizado com sucesso!" });
    })
    .catch((err) => {
      console.error("Erro ao salvar agendamento", err);
      res.status(500).json({ error: "Erro ao salvar agendamento" });
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
