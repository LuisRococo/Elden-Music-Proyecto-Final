const express = require("express");
const mongoose = require("mongoose");
const connectDatabase = require("./src/db/dbConnect");
const userRouter = require("./src/routes/userRoute");
const genreRouter = require("./src/routes/genreRoute");
const singerRouter = require("./src/routes/singerRoute");
const albumRouter = require("./src/routes/albumRouter");
const { getErrorAnswer } = require("./src/util/util");

//CONFIGURE
const port = 8000;
const app = express();
const apiRouter = express.Router();

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

apiRouter.use("/users", userRouter);
apiRouter.use("/genres", genreRouter);
apiRouter.use("/singers", singerRouter);
apiRouter.use("/albums", albumRouter);
app.use("/api", apiRouter);

//error handler middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(getErrorAnswer());
});

//INIT
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Servidor activo en http://localhost:${port}`);
});
