import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});

export default db;