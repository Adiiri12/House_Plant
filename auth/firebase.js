import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const app = firebase.initializeApp({
    apiKey: 'AIzaSyCLo7ZBWUW9_JAzyWcI3ta0g2x9HTHV-mE',
    authDomain: 'myhouseplants-development.firebaseapp.com',
    projectId: 'myhouseplants-development',
    storageBucket: 'myhouseplants-development.appspot.com',
    messagingSenderId: '123613500312',
    appId: '1:123613500312:web:96c08cfd3ea53f13a451ed',
    measurementId: 'G-FKZMJQ4G3Z',
});

export const auth = app.auth();
export const storage = firebase.storage(app);
export const firestore = firebase.firestore(app);

export default app;
