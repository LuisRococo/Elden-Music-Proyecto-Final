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

function isBase64SizeValid(base64File, maxSizeBytes) {
  const lastTwoCharacters = base64File.slice(-2);
  const doubleEqualCant = lastTwoCharacters.indexOf("==") !== -1 ? 2 : 1;
  filesize = base64File.length * (3 / 4) - doubleEqualCant;

  return filesize <= maxSizeBytes;
}

module.exports = {
  getErrorAnswer,
  getSuccessAnswer,
  isBase64SizeValid
};
