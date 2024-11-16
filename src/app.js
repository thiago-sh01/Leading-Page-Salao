const express = require("express");
const bodyParser = require("body-parser");
const agendamentosRoutes = require("./routes/agendamentos");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use("/api", agendamentosRoutes);

module.exports = app;
