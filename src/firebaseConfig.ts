// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getMultiFactorResolver,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import slugify from "./utils/slugify";
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
export const storage = getStorage();

export async function downloadPhoto(pictureUrl: string) {
  const httpsReference = ref(storage, pictureUrl);
  try {
    const downloadURL = await getDownloadURL(httpsReference);
    return downloadURL;
  } catch (error) {
    console.error("Error fetching download URL: ", error);
    return false;
  }
}

export async function deletePhoto(
  uid: string,
  photoUrl: string,
  eventSlug: string
) {
  try {
    const httpsReference = ref(storage, photoUrl);
    await deleteObject(httpsReference);

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const events = userData?.events || [];
      let eventIndex = events.findIndex(
        (event: { slug: string }) => event.slug === eventSlug
      );

      if (eventIndex !== -1) {
        const updatedEvents = [...events];

        // Mettez à jour le tableau des photos pour l'événement spécifique
        updatedEvents[eventIndex].photos = updatedEvents[
          eventIndex
        ].photos.filter((photo: string) => photo !== photoUrl);
        console.log(updatedEvents);

        // Mettez à jour le tableau des événements dans Firestore
        await updateDoc(docRef, {
          events: updatedEvents,
        });
      }
    } else {
      console.log("No such document!");
    }

    return true;
  } catch (error) {
    console.error("Error fetching download URL: ", error);
    return false;
  }
}

export async function uploadPhoto(uid: string, eventSlug: string, file: File) {
  const storageRef = ref(storage, `${uid}/${eventSlug}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Vous pouvez utiliser snapshot pour suivre la progression de l'upload
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

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

export async function getCurrentEvent(uid: string, eventSlug: string) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const events = userData?.events || [];
      const currentEvent = events.filter(
        (event: { slug: string }) => event.slug !== eventSlug
      );
      console.log("current event : " + currentEvent);
      return currentEvent;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("No such document!");
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
    return docSnap.data();
  } catch (error) {
    console.log("No such document!");
  }
}

export async function addPictureOnUserEvent(
  uid: string,
  eventSlug: string,
  downloadURL: string
) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const events = userData?.events || [];
      const updatedEvents = events.map(
        (event: { name: string; slug: string; photos: string[] }) => {
          if (event.slug === eventSlug) {
            return {
              ...event,
              photos: [...event.photos, downloadURL],
            };
          }
          return event;
        }
      );
      await updateDoc(docRef, { events: updatedEvents });
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addEventOnUserDocument(uid: string, eventName: string) {
  try {
    const docRef = doc(db, "users", uid);

    const newEvent = {
      name: eventName,
      slug: slugify(eventName),
      photos: [],
    };

    await updateDoc(docRef, {
      events: arrayUnion(newEvent),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteEventOnUserDocument(
  uid: string,
  eventSlug: string
) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      const events = userData?.events || [];
      const updatedEvents = events.filter(
        (event: { slug: string }) => event.slug !== eventSlug
      );

      await updateDoc(docRef, { events: updatedEvents });
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error deleting event: ", e);
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
    await updateDoc(docRef, {
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
