const app = require("./app");

const port = process.env.DB_PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
