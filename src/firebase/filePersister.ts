import firebase from "firebase";
import { DateTime } from 'luxon';
import { FBFile } from "@/plugins/interface";
import { storage } from ".";

class FilePersister {
  ref: firebase.storage.Reference;

  constructor(storage: firebase.storage.Storage) {
    this.ref = storage.ref().child('user');
  }

  async fetchAll(userId: string): Promise<FBFile[]> {
    const listRef = await this.ref
      .child(userId)
      .listAll();

    const files = await Promise.all(listRef.items.map(async itemRef => {
      const meta = await itemRef.getMetadata();
      return {
        filename: meta.name,
        url: await itemRef.getDownloadURL(),
        createdAt: DateTime.fromISO(meta.timeCreated).toHTTP(),
        updatedAt: DateTime.fromISO(meta.updated).toHTTP(),
      };
    }));

    // sort by updatedAt desc.
    files.sort((a, b) => DateTime.fromHTTP(b.updatedAt).diff(DateTime.fromHTTP(a.updatedAt), 'seconds').seconds);

    return files;
  }
  async upload(userId: string, files: File[]) {
    return Promise.all(
      files.map(async file => await this.ref
        .child(userId)
        .child(file.name)
        .put(file)
      )
    );
  }
  async delete(userId: string, filename: string) {
    const fileRef = this.ref
      .child(userId)
      .child(filename)

    return await fileRef.delete();
  }
}

export default new FilePersister(storage);
