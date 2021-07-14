import app from ".";

const storage = app.storage;

class FilePersister {
  constructor(storage, name) {
    this.ref = storage.ref().child('user');
    this.collectionName = name;
  }

  async upload(userId, collectionId, file) {
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
  constructor(storage) {
    super(storage, 'projects');
  }
}

export default {
  project: new ProjectFilePersister(storage),
}