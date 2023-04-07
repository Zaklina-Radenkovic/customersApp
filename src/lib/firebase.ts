// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
//getting & setting data on doc
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  collection,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { User } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5DySdrsmnh4kTadRtUawBaoz60EAZYcY",
  authDomain: "customerlist-a375e.firebaseapp.com",
  projectId: "customerlist-a375e",
  storageBucket: "customerlist-a375e.appspot.com",
  messagingSenderId: "157438362602",
  appId: "1:157438362602:web:fcbd66138bc3716e17a893",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//sign in with Google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  //force user to select account
  prompt: "select_account",
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//write user in DB
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "customers", userAuth.uid);
  //   console.log(userDocRef); we get document obj from db

  //we check and get data with special obj 'snapshot'
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  //'exists' tells does user exist in db
  // console.log(userSnapshot.exists());on that obj we check is there some documents

  //   if data doesn`t exist we want to create, set
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL, uid } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        name: displayName,
        email,
        photoURL,
        id: uid,
        createdAt: JSON.parse(JSON.stringify(createdAt)),
        ...additionalInformation,
      });
    } catch (error: any) {
      console.log("error creating the user", error.message);
    }
  }
  //   if exists, just return
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
