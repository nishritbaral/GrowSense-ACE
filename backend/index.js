import express from "express";

const app = express();
app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
