const express = require("express");
const { criarAgendamento } = require("../controllers/agendamentoController");

const router = express.Router();

router.post("/agendar", criarAgendamento);

module.exports = router;
