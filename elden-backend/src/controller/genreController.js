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
    const { name, description } = req.body;
    let newGenre = new Genre({ _id: name, description });
    newGenre = await newGenre.save();
    res.json(newGenre);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGenres,
  createGenre
};
