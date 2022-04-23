function getErrorAnswer(status = 500, error = "Something went bad") {
  return {
    status: status,
    error: error
  };
}

function getSuccessAnswer(status = 200, msj = "Success") {
  return {
    status: status,
    msj: msj
  };
}

module.exports = {
  getErrorAnswer,
  getSuccessAnswer
};
