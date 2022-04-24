const { Singer } = require("../db/models/singerModel");
const { getErrorAnswer } = require("../util/util");

async function getSingers(req, res, next) {
  try {
    const singers = await Singer.find();
    res.json(singers);
  } catch (error) {
    next(error);
  }
}

async function createSinger(req, res, next) {
  try {
    const { name, lastName, stageName, image, nationality } = req.body;
    let newSinger = new Singer({
      name,
      lastName,
      stageName,
      image,
      nationality
    });
    newSinger = await newSinger.save();
    res.json(newSinger);
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
    const { _id } = req.body;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const singer = await Singer.findByIdAndDelete(_id, { new: true });
    res.json(singer);
  } catch (error) {
    next(error);
  }
}

async function updateSinger(req, res, next) {
  try {
    const { _id, name, lastName, stageName, image, nationality } = req.body;

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
