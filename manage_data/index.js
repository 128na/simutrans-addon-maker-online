// setup admin sdk
const admin = require('firebase-admin');
const serviceAccount = require("./addon-builder-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'addon-builder.appspot.com'
});

const existsUid = require('./authentication');
const mapAllFiles = require('./storage');
const mapAllDocuments = require('./firestore');

// uidにマッチするユーザーが無いファイルを削除する
const deleteMissingUserFile = async file => {
  const uid = file.name.split('/')[1];
  const exists = await existsUid(uid);
  if (!exists) {
    await file.delete();
  }
};
mapAllFiles(deleteMissingUserFile);

// uidにマッチするユーザーが無いプロジェクトを削除する
// https://googleapis.dev/nodejs/firestore/latest/CollectionGroup.html
const deleteMissingUserDoc = async doc => {
  const uid = doc.ref.path.split('/')[1];
  const exists = await existsUid(uid);
  console.log(doc.ref.path, exists);
  if (!exists) {
    await doc.ref.delete();
  }
};
mapAllDocuments('projects', deleteMissingUserDoc);
mapAllDocuments('snippets', deleteMissingUserDoc);
