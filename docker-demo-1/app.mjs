import express from "express";

import connectToDatabase from "./helpers.mjs";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hi there! </h1>");
});

await connectToDatabase();

app.listen(3000);

console.log("App Running in http://localhost:3000");
