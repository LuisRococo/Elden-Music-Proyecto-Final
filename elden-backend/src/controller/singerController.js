const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const getDataBaseConnection = require("../db/dbConnect");

async function getSingers(req, res, next) {
  try {
    const jsonRes = {};
    const conn = await getDataBaseConnection();
    const [rows] =
      await conn.execute(`select json_arrayagg (result) as res from (
      select json_object (
        "id", u.id_genre
      ) as result
      from tbl_genre as u
    ) as result`);

    await conn.end();
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

async function createSinger(req, res, next) {
  try {
    const { singerName, stageName, nationality, image } = req.body;
    const conn = await getDataBaseConnection();
    await conn.execute("insert into tbl_file (file) values (?)", [image]);
    let [rows] = await conn.execute("select LAST_INSERT_ID() as 'idImage'");
    const idImage = rows[0].idImage;

    [rows] = await conn.execute(
      "insert into tbl_singer (singer_name, nationality, id_image, stage_name) values (?, ?, ?, ?)",
      [singerName, nationality, idImage]
    );

    await conn.end();
    res.json(getSuccessAnswer());
  } catch (error) {
    next(error);
  }
}

async function getSinger(req, res, next) {
  try {
    const { _id } = req.params;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const singer = await Singer.findById(_id);
    res.json(singer);
  } catch (error) {
    next(error);
  }
}

async function deleteSinger(req, res, next) {
  try {
    const { idSinger } = req.body;

    if (!idSinger) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const conn = await getDataBaseConnection();
    await conn.execute("delete from tbl_singer where id_singer = ?", [
      idSinger
    ]);

    res.json(getSuccessAnswer());
  } catch (error) {
    next(error);
  }
}

async function updateSinger(req, res, next) {
  try {
    const { idSinger, singerName, lastName, stageName, image, nationality } =
      req.body;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const singer = await Singer.findByIdAndUpdate(
      _id,
      { name, lastName, stageName, image, nationality },
      { new: true }
    );
    res.json(singer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSingers,
  createSinger,
  getSinger,
  deleteSinger,
  updateSinger
};
