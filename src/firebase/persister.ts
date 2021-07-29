import { db } from ".";
import firebase from "firebase";
import { DateTime } from 'luxon';
import { Data, Model } from "@/plugins/interface";

class Persister {
  userCollection: firebase.firestore.CollectionReference;
  collectionName: string;

  constructor(db: firebase.firestore.Firestore, name: string) {
    this.userCollection = db.collection('users');
    this.collectionName = name;
  }

  async create(userId: string, data: Data) {
    const createdAt = DateTime.now().toHTTP();
    const updatedAt = createdAt;
    const deletedAt = null;

    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc()
      .set(Object.assign(data, { createdAt, updatedAt, deletedAt }));
  }
  async update(userId: string, item: Model) {
    const updatedAt = DateTime.now().toHTTP();
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .update(Object.assign(item.data, { updatedAt }));
  }
  // 論理削除
  async delete(userId: string, item: Model) {
    const deletedAt = DateTime.now().toHTTP();
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .update({ deletedAt });
  }
  async restore(userId: string, item: Model) {
    const deletedAt = null;
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .update({ deletedAt });
  }
  // 物理削除
  async forceDelete(userId: string, item: Model) {
    return await this.userCollection
      .doc(userId)
      .collection(this.collectionName)
      .doc(item.id)
      .delete();
  }
  listen(userId: string, handler: Function) {
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
  constructor(db: firebase.firestore.Firestore) {
    super(db, 'projects');
  }
}

class SnippetPersister extends Persister {
  constructor(db: firebase.firestore.Firestore) {
    super(db, 'snippets');
  }
}

export default {
  project: new ProjectPersister(db),
  snippet: new SnippetPersister(db),
}