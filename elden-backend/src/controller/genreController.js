const { Genre } = require("../db/models/genreModel");

async function getGenres(req, res, next) {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function createGenre(req, res, next) {
  try {
    const { _id, description } = req.body;
    let newGenre = new Genre({ _id, description });
    newGenre = await newGenre.save();
    res.json(newGenre);
  } catch (error) {
    next(error);
  }
}

async function getGenre(req, res, next) {
  try {
    const { _id } = req.params;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const genre = await Genre.findById(_id);
    res.json(genre);
  } catch (error) {
    next(error);
  }
}

async function deleteGenre(req, res, next) {
  try {
    const { _id } = req.body;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const genre = await Genre.findByIdAndDelete(_id, { new: true });
    res.json(genre);
  } catch (error) {
    next(error);
  }
}

async function updateGenre(req, res, next) {
  try {
    const { _id, description } = req.body;

    if (!_id) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    const genre = await Genre.findByIdAndUpdate(
      _id,
      { description },
      { new: true }
    );
    res.json(genre);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres,
  createGenre,
  getGenre,
  deleteGenre,
  updateGenre
};
