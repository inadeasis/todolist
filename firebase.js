const firebaseConfig = {
    apiKey: "AIzaSyDhTgkak13qHlRX0ZR6jz5xBOlKeNWQXN4",
    authDomain: "to-do-app-ac8ef.firebaseapp.com",
    projectId: "to-do-app-ac8ef",
    storageBucket: "to-do-app-ac8ef.appspot.com",
    messagingSenderId: "382118771078",
    appId: "1:382118771078:web:a65c0f005e36321c445407",
    measurementId: "G-H4FN1V96N4"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.getAnalytics();


var db = firebase.firestore();