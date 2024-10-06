import { 
    initializeApp,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    sendPasswordResetEmail, 
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9ppt5vU-XhTu6FYaoWY60oaDAZmXF_-4",
    authDomain: "my-first-firebase-projec-a87d4.firebaseapp.com",
    projectId: "my-first-firebase-projec-a87d4",
    storageBucket: "my-first-firebase-projec-a87d4.appspot.com",
    messagingSenderId: "253620189390",
    appId: "1:253620189390:web:3b7f7e0c4bdff852e3f89f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(app);

const db = getFirestore();

//DOM references
const resetEmailField = document.getElementById("reset-email");
const resetButton = document.getElementById("reset-btn");
const resetPasswordMessage = document.getElementById("rp-message");


onAuthStateChanged(auth, async(user) => {
    console.log(user);
});

const onResetPasswordPressed = async(e) => {
    e.preventDefault();

    try {
        await sendPasswordResetEmail(auth, resetEmailField.value);
        resetPasswordMessage.innerHTML = `we've sent a link to reset your password to ${resetEmailField.value}`;
        resetPasswordMessage.classList.add("success");
    } catch (error) {
        console.log(error.code);
        resetPasswordMessage.innerHTML = "Please provide a valid registration email.";
        resetPasswordMessage.classList.add("error");
    }
    resetPasswordMessage.classList.remove("hidden");
    console.log(resetEmailField.value);
}
resetButton.addEventListener("click", onResetPasswordPressed);