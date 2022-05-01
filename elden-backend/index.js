const express = require("express");
const connectDatabase = require("./src/db/dbConnect");
const userRouter = require("./src/routes/userRoute");
const genreRouter = require("./src/routes/genreRoute");
const singerRouter = require("./src/routes/singerRoute");
const albumRouter = require("./src/routes/albumRouter");
const testRouter = require("./src/routes/testRoute");
const { getErrorAnswer } = require("./src/util/util");
var cors = require("cors");

//CONFIGURE
const port = 8000;
const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb"
  })
);
app.use(express.json({ limit: "16mb" }));

//ROUTES
app.get("/", (req, res) => {
  res.send({ welcome: "Welcome to Elden Music API !!!" });
});

apiRouter.use("/users", userRouter);
apiRouter.use("/genres", genreRouter);
apiRouter.use("/singers", singerRouter);
apiRouter.use("/albums", albumRouter);
apiRouter.use("/test", testRouter);
app.use("/api", apiRouter);

//error handler middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(getErrorAnswer());
});

//INIT
app.listen(port, async () => {
  // const conn = await connectDatabase();
  // const [rows] = await conn.execute("SELECT 1 + 1 + 1 AS solution", [2]);
  // await conn.end();
  // console.log(rows);
  console.log(`Servidor activo en http://localhost:${port}`);
});
