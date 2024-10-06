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
const userName = document.getElementById("username-register");
const phoneNumber = document.getElementById("phone-register");
const emailId= document.getElementById("email-register");
const password = document.getElementById("password-register");
const createAccBtn= document.getElementById("create-account-btn");
const UiErrorMessage = document.getElementById('error-message');

onAuthStateChanged(auth, async(user) => {
    console.log(user);
});

const onCreateAccBtnPressed = async(e) => {
    e.preventDefault();

    try {
        console.log("A");
        const userCredentials = await createUserWithEmailAndPassword(
            auth, 
            emailId.value,
            password.value
        );

        await sendEmailVerification(userCredentials.user);
        console.log("B");
        const docRef = doc(db, "users", userCredentials.user.uid);
        console.log("C");
        // await setDoc(docRef, {
        //     name : userName.value, 
        //     phone : phoneNumber.value,
        //     email : emailId.value
        // });
        console.log("D");
        UiErrorMessage.innerHTML = `Account created successfully!`;
        console.log(userCredentials);
    } catch (error) {
        console.log(error.code);
        UiErrorMessage.innerHTML = formateErrorMessage(error.code, "signup");
    }
    UiErrorMessage.classList.remove("hidden");
}

createAccBtn.addEventListener("click", onCreateAccBtnPressed)

//handles sign up erros
const formateErrorMessage = (errorCode, action) => {
    let message = ""

    if(action == "signup") {
        if(errorCode === "auth/invalid-email" || errorCode === "auth/missing-email"){
            message = "Please enter a valid email"
        } else if(
            errorCode === "auth/missing-password"  || 
            errorCode === "auth/weak-password"      
        ){
            message= "password must be 6 characters long"
        } else if(
            errorCode === "auth/already-in-use"
        ){
            message= "email is already in use"
        }
    } else if( action == "login"){
        if(errorCode == "auth/invalid-email" || 
            errorCode == "auth/missing-password"
        ){
            message ="Email or password is incorrect"
        } else if(errorCode == "auth/user-not-found"){
            message ="Our system was unable to verify your email or password"
        }
    }
    
    return message;
}