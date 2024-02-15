// components/SignIn.js
"use client";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth} from "firebase/auth"
import { useEffect } from 'react';
 export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};



export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();



  console.log(firebase);
  console.log(app,storage,auth);


const SignIn = () => {
  
    //useEffect(() => {
      //  console.log(firebase);
       // const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
        //  if (user) {
          //  console.log("User is signed in:", user);
         // } else {
           // console.log("User is signed out");
         // }
       // });
    
     //   return () => unregisterAuthObserver(); // Make sure to unregister the observer when the component unmounts
     // }, []);  
  

  return (
    <div>
      <h1>Sign In</h1>
      <p>Please sign in with your email:</p>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
};

export default SignIn;