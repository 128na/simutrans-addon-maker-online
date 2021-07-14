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

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const storage = firebase.storage(app);

export default { db, storage };
