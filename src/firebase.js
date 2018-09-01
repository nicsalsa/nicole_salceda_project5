import firebase from 'firebase';

// Initialize Firebase
var config = {
   apiKey: "AIzaSyARaKecH14gGkGS7J1T6Pp2Nttc46eV6Kc",
   authDomain: "fir-groceryapp-d18e5.firebaseapp.com",
   databaseURL: "https://fir-groceryapp-d18e5.firebaseio.com",
   projectId: "fir-groceryapp-d18e5",
   storageBucket: "fir-groceryapp-d18e5.appspot.com",
   messagingSenderId: "993401503336"
};
firebase.initializeApp(config);

export default firebase;