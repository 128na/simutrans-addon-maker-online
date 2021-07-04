import app from "../firebase";
import { DateTime } from 'luxon';

const db = app.db;
const users = db.collection('users');

export default {
  project: {
    async create(userId, projectData) {
      const createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
      const updatedAt = createdAt;

      return await users.doc(userId)
        .collection('projects')
        .doc()
        .set(Object.assign(projectData, { createdAt, updatedAt }));
    },
    async update(userId, project) {
      const updatedAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
      return await users.doc(userId)
        .collection('projects')
        .doc(project.id)
        .update(Object.assign(project.data, { updatedAt }));
    },
    async delete(userId, project) {
      return await users.doc(userId)
        .collection('projects')
        .doc(project.id)
        .delete();
    },
    listen(userId, handler) {
      return users.doc(userId)
        .collection('projects')
        .orderBy('updatedAt', 'desc')
        .onSnapshot(col => {
          handler(col.docs.map(doc => {
            return { id: doc.id, data: doc.data() };
          }));
        });
    }
  }
}