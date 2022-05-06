const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const getDataBaseConnection = require("../db/dbConnect");
const Singer = require("../db/models/singerModel");
const File = require("../db/models/fileModel");

async function getSingers(req, res, next) {
  try {
    const response = await Singer.findAll({
      // include: [
      //   {
      //     model: File,
      //   },
      // ],
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
    await Singer.destroy({ where: { id_singer: idSinger } });
    await File.destroy({ where: { id_file: singer.id_image } });

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
  updateSinger,
};
