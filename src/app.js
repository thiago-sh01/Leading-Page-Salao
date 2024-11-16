const express = require("express");
const bodyParser = require("body-parser");
const agendamentosRoutes = require("./routes/agendamentos");

const app = express();

require("dotenv").config();

app.use(bodyParser.json());

app.use("/api", agendamentosRoutes);

module.exports = app;
