// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getMultiFactorResolver,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
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
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getCurrentUser() {
  try {
    const user = auth.currentUser;
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return false;
  }
}

export async function getUserDocument(uid: string) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    return docSnap.data();
  } catch (error) {
    console.log("No such document!");
  }
}

async function createUserDocument(
  uid: string,
  firstName: string,
  lastName: string,
  subscriptionLevel: string
) {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, {
      firstName: firstName,
      lastName: lastName,
      subscriptionLevel: subscriptionLevel,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    await createUserDocument(user.uid, firstName, lastName, "Basique");
    console.log(user);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("Sign-out successful.");
  } catch (error) {
    console.log("An error happened.");
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
