const Address = require("../db/models/addressModel");
const { getErrorAnswer, getSuccessAnswer } = require("../util/util");

async function getUserAddresses(req, res, next) {
  try {
    const { id_user } = req.body.decode;
    const address = await Address.findAll({
      where: {
        id_user: id_user,
      },
    });
    res.json(address);
  } catch (error) {
    next(error);
  }
}

async function createAddress(req, res, next) {
  try {
    const { id_user } = req.body.decode;
    const { address } = req.body;

    await Address.create({
      address,
      id_user,
    });
    res.json(getSuccessAnswer(200, "Album created"));
  } catch (error) {
    next(error);
  }
}

async function getAddressDefault(req, res, next) {
  try {
    const { id_user } = req.body.decode;

    const address = await Address.findOne({
      where: {
        id_user,
        is_main_adress,
      },
    });

    res.json(address);
  } catch (error) {
    next(error);
  }
}

async function deleteAddress(req, res, next) {
  try {
    const { id_user } = req.body.decode;
    const { id_address } = req.body;

    if (!id_address) {
      res.status(400).json(getErrorAnswer(400, "Identificator is needed"));
      return;
    }

    await Address.destroy({
      where: {
        id_user,
        id_address,
      },
    });

    res.json(getSuccessAnswer(200, "Address deleted"));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserAddresses,
  deleteAddress,
  createAddress,
  getAddressDefault,
};
