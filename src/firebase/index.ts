import firebase from "firebase";
import "firebase/performance";

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

export const app: firebase.app.App = firebase.initializeApp(firebaseConfig);
export const db: firebase.firestore.Firestore = firebase.firestore(app);
export const storage: firebase.storage.Storage = firebase.storage(app);
export const performance = firebase.performance();

// https://developers.google.com/gtagjs/reference/event?hl=ja#page_view
export const analytics = firebase.analytics();
export const authProviders: { [index: string]: any } = {
  google: firebase.auth.GoogleAuthProvider,
  twitter: firebase.auth.TwitterAuthProvider,
}
