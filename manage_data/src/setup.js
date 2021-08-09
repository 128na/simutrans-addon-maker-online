// setup admin sdk
const admin = require('firebase-admin');
const serviceAccount = require("../addon-builder-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'addon-builder.appspot.com'
});
