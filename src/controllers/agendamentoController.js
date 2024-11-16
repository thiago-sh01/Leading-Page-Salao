const client = require("../config/database");

const criarAgendamento = async (req, res) => {
  const { nome, telefone, data, hora } = req.body;

  if (!nome || !telefone || !data || !hora) {
    return res
      .status(400)
      .json({ error: "Todos os os campos são obrigatórios" });
  }

  const query = `INSERT INTO agendamentos (nome, telefone, data, hora) VALUES ($1, $2, $3, $4) RETURNING id`;
  const values = [nome, telefone, data, hora];

  try {
    await client.query(query, values);
    res.status(201).json({ message: "Agendamento realizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao salvar agendamento", err);
    res.status(500).json({ error: "Erro ao salvar agendamento" });
  }
};

module.exports = { criarAgendamento };
