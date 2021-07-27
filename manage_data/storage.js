const admin = require('firebase-admin');
const db = admin.firestore();

const mapAllDocuments = async (name, fn) => {
  const query = db.collectionGroup(name);
  for await (const partition of query.getPartitions(42)) {
    const querySnapshot = await partition.toQuery().get();
    await Promise.all(querySnapshot.docs.map(fn));
  }
};

module.exports = mapAllDocuments;
