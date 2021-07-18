import app from ".";
import { DateTime } from 'luxon';

const db = app.db;

class Persister {
  constructor(db, name) {
    this.userCollection = db.collection('users');
    this.collectionName = name;
  }

  async create(userId, data) {
    const createdAt = DateTime.now().toHTTP();
    const updatedAt = createdAt;
    const deletedAt = null;

    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc()
      .set(Object.assign(data, { createdAt, updatedAt, deletedAt }));
  }
  async update(userId, item) {
    const updatedAt = DateTime.now().toHTTP();
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .update(Object.assign(item.data, { updatedAt }));
  }
  // 論理削除
  async delete(userId, item) {
    const deletedAt = DateTime.now().toHTTP();
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .update({ deletedAt });
  }
  async restore(userId, item) {
    const deletedAt = null;
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .update({ deletedAt });
  }
  // 物理削除
  async forceDelete(userId, item) {
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .delete();
  }
  listen(userId, handler) {
    return this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .orderBy('updatedAt', 'desc')
      .onSnapshot(col => {
        handler(col.docs.map(doc => {
          return { id: doc.id, data: doc.data() };
        }));
      });
  }
}

class ProjectPersister extends Persister {
  constructor(db) {
    super(db, 'projects');
  }
}

class SnippetPersister extends Persister {
  constructor(db) {
    super(db, 'snippets');
  }
}

export default {
  project: new ProjectPersister(db),
  snippet: new SnippetPersister(db),
}