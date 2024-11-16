const app = require("./app");

const port = process.env.PORT || 5433;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
