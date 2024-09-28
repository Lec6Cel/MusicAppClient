import {initializeApp, getApp, getApps} from 'firebase/app';
import {getStorage} from 'firebase/storage';

//firebase config trong .env
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

//kiem tra xem co ung dung firebase nao trc do hay khong? neu getApps.length > 0 thi da co ung dung khoi tao,
//va neu co roi thi se tra ve instance da co trong firebase, con khong thi se khoi tao ung dung firebase moi 
// voi cau hinh da cung cap
const app = getApps.length > 0 ? getApp() : initializeApp (firebaseConfig);
// dung de lay instance va app la instance cua firebase
const storage = getStorage(app);

export {app, storage};