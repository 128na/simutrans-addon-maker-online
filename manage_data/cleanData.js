#!/usr/bin/env node

require('./src/setup');

const { existsUid } = require('./src/authentication');
const { mapAllFiles } = require('./src/storage');
const { mapAllDocuments } = require('./src/firestore');

// uidにマッチするユーザーが無いファイルを削除する
const deleteMissingUserFile = async file => {
  const uid = file.name.split('/')[1];
  const exists = await existsUid(uid);
  console.log(file.name, exists);
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
