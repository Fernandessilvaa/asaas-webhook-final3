const express = require("express");
const app = express();
app.use(express.json());

const ASAAS_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN || "meu_token_teste";

app.get("/healthz", (req, res) => res.status(200).send("Servidor rodando 🚀"));

app.post("/webhook/asaas", (req, res) => {
  const tokenHeader = req.headers["asaas-access-token"];
  if (tokenHeader !== ASAAS_TOKEN) return res.status(403).send("Token inválido");

  console.log("📩 Webhook recebido do Asaas!");
  console.log("Evento:", req.body.event);
  console.log("Dados:", req.body);

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor ouvindo na porta ${PORT}`));
