import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDEG-IbOSPdNWAV3FIFQ2eRRCZg77Omc9w",
    authDomain: "fir-crud-5e10b.firebaseapp.com",
    projectId: "fir-crud-5e10b",
    storageBucket: "fir-crud-5e10b.appspot.com",
    messagingSenderId: "372405814786",
    appId: "1:372405814786:web:42fcba23ba753cfaaa891b"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export const auth = fire.auth()
  export const db = fire.firestore()