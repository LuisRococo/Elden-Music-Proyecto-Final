const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const File = require("../db/models/fileModel");
const {
  doesUserOwnsSong,
  getCorrspondingSongVersion,
} = require("../util/dbUtil");

async function getFile(req, res, next) {
  try {
    const { idFile } = req.params;

    const file = await File.findOne({ where: { id_file: idFile } });

    if (file.is_song) {
      res
        .status(400)
        .json(
          getErrorAnswer(
            400,
            "Denied. To access songs use '/api/files/songs/{id}'"
          )
        );
      return;
    }

    res.json(file);
  } catch (error) {
    next(error);
  }
}

async function getSong(req, res, next) {
  try {
    const { decode } = req.body;
    const { idSong } = req.params;

    res.json(await getCorrspondingSongVersion(decode, idSong));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFile,
  getSong,
};
