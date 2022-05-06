const { getErrorAnswer, getSuccessAnswer } = require("../util/util");
const File = require("../db/models/fileModel");

async function getFile(req, res, next) {
  try {
    const { idFile } = req.params;
    const response = await File.findOne({ where: { id_file: idFile } });
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFile,
};
