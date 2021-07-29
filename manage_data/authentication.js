const admin = require('firebase-admin');

const existsUids = {};
const doesntExistUids = {};
const existsUid = async uid => {
  if (existsUids[uid]) {
    return true;
  }
  if (doesntExistUids[uid]) {
    return false;
  }
  try {
    await admin.auth().getUser(uid);
    existsUids[uid] = true;
    return true;
  } catch (e) {
    doesntExistUids[uid] = true;
    return false;
  }
};

module.exports = existsUid;
