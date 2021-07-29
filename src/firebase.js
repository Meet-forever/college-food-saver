import firebase from "firebase/app"
import "firebase/auth"

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBkYPWkEoWZuM-aUSaaafW59APCqPw-ys4",
    authDomain: "food-app-463a3.firebaseapp.com",
    projectId: "food-app-463a3",
    storageBucket: "food-app-463a3.appspot.com",
    messagingSenderId: "887576427920",
    appId: "1:887576427920:web:f0850b38034becf5188715",
    measurementId: "G-BY3YWY2Y0F"
})

export const auth = app.auth()
