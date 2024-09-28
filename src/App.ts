// src/App.ts
import express from 'express';
import { morganConfig } from 'shared/infrastructure';
const cors = require("cors");

const app = express();
const port = 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Test servidor test');
});


app.get("/healthcheck", async (req, res) => {
  return res.status(200).send({
    database: "OK",
    cache: "OK",
  });
});

app.listen(port, () => {
  console.log(`Servidor en staging main http://localhost:${port}`);
});

app.use(cors());
app.use(morganConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));