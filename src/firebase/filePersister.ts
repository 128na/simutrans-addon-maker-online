import app from ".";
import firebase from "firebase";

const storage = app.storage;

class FilePersister {
  ref: firebase.storage.Reference;
  collectionName: string;

  constructor(storage: firebase.storage.Storage, name: any) {
    this.ref = storage.ref().child('user');
    this.collectionName = name;
  }

  async upload(userId: string, collectionId: string, file: File) {
    const fileRef = this.ref
      .child(userId)
      .child(this.collectionName)
      .child(collectionId)
      .child(file.name)

    await fileRef.put(file);
    return await fileRef.getDownloadURL();
  }
}

class ProjectFilePersister extends FilePersister {
  constructor(storage: firebase.storage.Storage) {
    super(storage, 'projects');
  }
}

export default {
  project: new ProjectFilePersister(storage),
}