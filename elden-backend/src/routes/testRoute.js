const express = require("express");
const router = express.Router();
const connectDatabase = require("../db/dbConnect");

router.get("/imagen/:idImagen", async (req, res) => {
  const idFile = req.params.idImagen;

  const conn = await connectDatabase();
  const [rows] = await conn.execute(
    "select file from tbl_test_files where id_file = ?",
    [idFile]
  );
  const imagen = rows[0].file;

  res.send(imagen);
});

router.post("/imagen", async (req, res) => {
  const imagen = req.body.imagen;

  const conn = await connectDatabase();
  await conn.execute("insert into tbl_test_files (file) values (?)", [imagen]);
  const [rows] = await conn.execute("select LAST_INSERT_ID() as 'id'");
  const imgenId = rows[0].id.toString();
  await conn.end();

  res.send(imgenId);
});

router.get("/song/:songId", async (req, res) => {
  const songId = req.params.songId;

  const conn = await connectDatabase();
  const [rows] = await conn.execute(
    "select file from tbl_test_files where id_file = ?",
    [songId]
  );
  const song = rows[0].file;

  res.send(song);
});

router.post("/song", async (req, res) => {
  const song = req.body.song;

  const conn = await connectDatabase();
  await conn.execute("insert into tbl_test_files (file) values (?)", [song]);
  const [rows] = await conn.execute("select LAST_INSERT_ID() as 'id'");
  const songId = rows[0].id.toString();
  await conn.end();

  res.send(songId);
});

module.exports = router;
