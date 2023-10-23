// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getMultiFactorResolver,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB3HWaL8EhXoULG-5qNEKO0y8BCuDP5AWA",
  authDomain: "partymemory-cbed1.firebaseapp.com",
  projectId: "partymemory-cbed1",
  storageBucket: "partymemory-cbed1.appspot.com",
  messagingSenderId: "807759682613",
  appId: "1:807759682613:web:d3ada7c2cd624635c4657c",
  measurementId: "G-0RYDV44JHM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
}

export function logoutUser() {
  return auth.signOut();
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return error;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return true;
  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    return error;
  }
}
