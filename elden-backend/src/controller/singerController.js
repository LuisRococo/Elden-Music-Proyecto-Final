const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const getDataBaseConnection = require("../db/dbConnect");
const Singer = require("../db/models/singerModel");
const File = require("../db/models/fileModel");
const Album = require("../db/models/albumModel");
const Song = require("../db/models/songModel");

async function getSingers(req, res, next) {
  try {
    const response = await Singer.findAll({
      include: [
        {
          model: Album,
          include: [
            {
              model: Song,
            },
          ],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function createSinger(req, res, next) {
  const { singerName, stageName, nationality, image } = req.body;
  try {
    const dbImage = await File.create({ file_content: image });

    await Singer.create({
      singer_name: singerName,
      stage_name: stageName,
      nationality: nationality,
      id_image: dbImage.id_file,
    });
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

    const singer = await Singer.findOne({ where: { id_singer: idSinger } });
    await sequelize.query("UPDATE users SET y = 42 WHERE x = 12");

    await Album.destroy({ where: { id_singer: singer.id_singer } });
    await Singer.destroy({ where: { id_singer: idSinger } });
    await File.destroy({ where: { id_file: singer.id_image } });

    res.json(getSuccessAnswer());
  } catch (error) {
    next(error);
  }
}

async function updateSinger(req, res, next) {
  try {
    const { idSinger, singerName, stageName, image, nationality } = req.body;

    if (!idSinger) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    //FIND AND CHECK IF SINGER EXISTS
    const singer = await Singer.findOne({ where: { id_singer: idSinger } });
    if (!singer) {
      res.status(404).json(getErrorAnswer(404, "Singer was not found"));
      return;
    }

    //UPDATE IMAGE
    const fileImage = await File.findOne({
      where: { id_file: singer.id_image },
    });
    fileImage.set({
      file_content: image,
    });
    await fileImage.save();

    //CHANGE SINGER
    singer.set({
      singer_name: singerName,
      stage_name: stageName,
      nationality: nationality,
    });
    await singer.save();

    res.json(getSuccessAnswer(200, "Singer Updated"));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSingers,
  createSinger,
  getSinger,
  deleteSinger,
  updateSinger,
};
