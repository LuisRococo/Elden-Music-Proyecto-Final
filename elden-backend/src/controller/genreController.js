const getDataBaseConnection = require("../db/dbConnect");
const { getErrorAnswer } = require("../util/util");

async function getGenres(req, res, next) {
  try {
    const conn = await getDataBaseConnection();
    const [rows] = await conn.execute("select * from tbl_genre");
    await conn.end();
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function getGenre(req, res, next) {
  try {
    const { idGenre } = req.params;

    if (!idGenre) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const conn = await getDataBaseConnection();
    const [rows] = await conn.execute(
      "select * from tbl_genre where id_genre = ? limit 1",
      [idGenre]
    );
    await conn.end();
    res.json({ ...rows[0] });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres,
  getGenre
};
