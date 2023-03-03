import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP__FB_API_KEY,
  authDomain: process.env.REACT_APP__FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP__FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP__FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP__FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP__FB_APP_ID,
  measurementId: process.env.REACT_APP__FB_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

/**
 * Logs in the user using Google
 */
const loginWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
  const q = query(collection(db, 'userProfiles'), where('uid', '==', user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, 'userProfiles'), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email
    });
  }
};

/**
 * Logs in the user using the provided email and password
 * @param {string} email The email
 * @param {string} password The password
 */
const loginWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Registers the user using their email and password
 * and sends their email verification email.
 * @param {string} name The value to be set as their display name.
 * @param {string} email The value to be used as their email.
 * @param {string} password The value to be used as their password.
 */
const registerWithEmailAndPassword = async (name, email, password) => {
  const res = await (await createUserWithEmailAndPassword(auth, email, password));
  const user = res.user;
  await updateProfile(user, {
    displayName: name
  });
  await setDoc(doc(db, `userProfiles/${user.uid}`), {
    uid: user.uid,
    name: name,
    authProvider: 'local',
    email: email
  });
  await sendEmailVerification(user);
};

/**
 * Sends a password reset email to the provided email.
 * @param {string} email The email to send the password reset to.
 */
const sendPasswordReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
};


const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  analytics,
  loginWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout
};
