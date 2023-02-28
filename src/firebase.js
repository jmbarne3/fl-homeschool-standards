import { env } from 'process';
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
  addDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: env.REACT_APP__FB_API_KEY,
  authDomain: env.REACT_APP__FB_AUTH_DOMAIN,
  projectId: env.REACT_APP__FB_PROJECT_ID,
  storageBucket: env.REACT_APP__FB_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP__FB_MESSAGING_SENDER_ID,
  appId: env.REACT_APP__FB_APP_ID,
  measurementId: env.REACT_APP__FB_MEASUREMENT_ID
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
  try {
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
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

/**
 * Logs in the user using the provided email and password
 * @param {string} email The email
 * @param {string} password The password
 */
const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

/**
 * Registers the user using their email and password
 * and sends their email verification email.
 * @param {string} name The value to be set as their display name.
 * @param {string} email The value to be used as their email.
 * @param {string} password The value to be used as their password.
 */
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, {
      displayName: name
    });
    await addDoc(collection(db, 'userProfiles'), {
      uid: user.uid,
      name: name,
      authProvider: 'local',
      email: email
    });
    await sendEmailVerification(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

/**
 * Sends a password reset email to the provided email.
 * @param {string} email The email to send the password reset to.
 */
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
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
