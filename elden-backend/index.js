const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./src/db/dbConnect");
const userRouter = require("./routes/userRoute");
const { getErrorAnswer } = require("./util/util");

//CONFIGURE
const port = 8000;
const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.send({ welcome: "Welcome to Elden Music API !!!" });
});

app.use("/api/users", userRouter);

//error handler middleware
app.use((error, req, res, next) => {
  res.status(500).send(getErrorAnswer());
});

//INIT

app.listen(port, async () => {
  await connectDatabase();
  console.log(`Servidor activo en http://localhost:${port}`);
});
