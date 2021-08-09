
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();

const mapAllFiles = (fn, nextQuery = { maxResults: 1 }) => {
  bucket.getFiles(nextQuery).then(async ([files, nextQuery]) => {
    await Promise.all(files.map(fn));
    if (nextQuery) {
      mapAllFiles(fn, nextQuery);
    }
  })
    .catch((error) => {
      console.log('Error:', error);
    });
};

module.exports = { mapAllFiles };
