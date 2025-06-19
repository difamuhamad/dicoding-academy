function checkFinished(pageCount, readPage) {
  if (pageCount > readPage) {
    return false;
  } else if (pageCount === readPage || pageCount < readPage) {
    return true;
  }
}

module.exports = { checkFinished };
