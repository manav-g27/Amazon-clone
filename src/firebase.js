import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBSDLnObtbzoATUeBUbbjq2GH7gtX_yXg0",
    authDomain: "clone-project-7c5b4.firebaseapp.com",
    projectId: "clone-project-7c5b4",
    storageBucket: "clone-project-7c5b4.appspot.com",
    messagingSenderId: "704645741297",
    appId: "1:704645741297:web:d968dd32d791c5f77e4750"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

  const db=app.firestore()

  export default db;