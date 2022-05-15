const express = require("express");
const userRouter = require("./src/routes/userRoute");
const genreRouter = require("./src/routes/genreRoute");
const singerRouter = require("./src/routes/singerRoute");
const albumRouter = require("./src/routes/albumRouter");
const testRouter = require("./src/routes/testRoute");
const fileRoute = require("./src/routes/fileRoute");
const songRoute = require("./src/routes/songRoute");
const singerTops = require("./src/routes/topSingerSongs");
const servicesRoute = require("./src/routes/servicesRoute");
const addressRoute = require("./src/routes/addressRoute");
const playlistsRoute = require("./src/routes/PlaylistRoute");
const playlistSongsRoute = require("./src/routes/playlistSongRoute");
const { getErrorAnswer } = require("./src/util/util");
const path = require("path");
var cors = require("cors");

//CONFIGURE
const port = 8000;
const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(express.json({ limit: "16mb" }));
app.use(express.static(path.join(__dirname, "src", "build")));

//ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "src", "index.html"));
});

apiRouter.use("/users", userRouter);
apiRouter.use("/genres", genreRouter);
apiRouter.use("/singers", singerRouter);
apiRouter.use("/albums", albumRouter);
apiRouter.use("/test", testRouter);
apiRouter.use("/files", fileRoute);
apiRouter.use("/songs", songRoute);
apiRouter.use("/singer-tops", singerTops);
apiRouter.use("/addresses", addressRoute);
apiRouter.use("/services", servicesRoute);
apiRouter.use("/playlists", playlistsRoute);
apiRouter.use("/playlist-songs", playlistSongsRoute);
app.use("/api", apiRouter);

//error handler middleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send(getErrorAnswer(500));
});

//INIT
app.listen(port, async () => {
  require("./src/db/init");
  console.log(`Servidor activo en http://localhost:${port}`);
});
