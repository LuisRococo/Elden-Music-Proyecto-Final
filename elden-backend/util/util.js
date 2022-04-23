function getErrorAnswer(status = 500, error = "Something went wrong :c") {
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
