import firebase from "firebase";

// https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: "AIzaSyDjH0VkRCQBKzQNBwxzTwRSSYAIpGnem-0",
  authDomain: "addon-builder.firebaseapp.com",
  projectId: "addon-builder",
  storageBucket: "addon-builder.appspot.com",
  messagingSenderId: "689624728391",
  appId: "1:689624728391:web:525eaccd8331aeae23c262",
  measurementId: "G-NKDKP21HBK"
};

const app: firebase.app.App = firebase.initializeApp(firebaseConfig);
const db: firebase.firestore.Firestore = firebase.firestore(app);
const storage: firebase.storage.Storage = firebase.storage(app);

const authProviders: { [index: string]: any } = {
  google: firebase.auth.GoogleAuthProvider,
  twitter: firebase.auth.TwitterAuthProvider,
}

export default { db, storage, authProviders };
