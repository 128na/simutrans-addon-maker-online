import app from ".";
import firebase from "firebase";

const storage = app.storage;

class FilePersister {
  ref: firebase.storage.Reference;

  constructor(storage: firebase.storage.Storage) {
    this.ref = storage.ref().child('user');
  }

  async upload(userId: string, file: File) {
    const fileRef = this.ref
      .child(userId)
      .child(file.name)

    await fileRef.put(file);
    return await fileRef.getDownloadURL();
  }
}

export default new FilePersister(storage);
