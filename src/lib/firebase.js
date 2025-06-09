// src/lib/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

/**
 * Firebase configuration using environment variables for security.
 * All keys are prefixed with GATSBY_ to be accessible within Gatsby.
 */
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app safely, avoiding duplicate initialization in SSR environments
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export initialized Auth and Firestore instances
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Google Auth provider instance for social login
export const googleProvider = new GoogleAuthProvider();

/**
 * Listener for authentication state changes.
 * @param {(user: import('firebase/auth').User|null) => void} callback 
 * @returns {() => void} unsubscribe function
 */
export function subscribeAuth(callback) {
  if (!auth) return () => {}; // no-op if auth not initialized
  return onAuthStateChanged(auth, callback);
}

/**
 * Sign in with Google using a popup window.
 */
export async function loginWithGoogle() {
  if (!auth || !googleProvider) throw new Error("Firebase Authentication is not initialized.");
  return signInWithPopup(auth, googleProvider);
}

/**
 * Log in with email and password.
 * @param {string} email 
 * @param {string} password 
 */
export async function loginWithEmail(email, password) {
  if (!auth) throw new Error("Firebase Authentication is not initialized.");
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign up/accounts creation with email and password.
 * @param {string} email 
 * @param {string} password 
 */
export async function signupWithEmail(email, password) {
  if (!auth) throw new Error("Firebase Authentication is not initialized.");
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out the current user.
 */
export async function logout() {
  if (!auth) throw new Error("Firebase Authentication is not initialized.");
  return signOut(auth);
}

/**
 * Fetch a Firestore document data by path.
 * @param {string} path Document path, e.g. "users/uid"
 * @returns {Promise<Object|null>} Document data or null if not exists
 */
export async function getDocData(path) {
  if (!db) throw new Error("Firestore is not initialized.");
  const docRef = doc(db, ...path.split("/"));
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
}

/**
 * Overwrite Firestore document with the provided data.
 * @param {string} path Document path
 * @param {Object} data Data to write
 * @returns {Promise<void>}
 */
export async function setDocData(path, data) {
  if (!db) throw new Error("Firestore is not initialized.");
  const docRef = doc(db, ...path.split("/"));
  return setDoc(docRef, data);
}

/**
 * Update existing Firestore document with merged data.
 * @param {string} path Document path
 * @param {Object} data Partial data to update
 * @returns {Promise<void>}
 */
export async function updateDocData(path, data) {
  if (!db) throw new Error("Firestore is not initialized.");
  const docRef = doc(db, ...path.split("/"));
  return updateDoc(docRef, data);
}

/**
 * Add a new document to a Firestore collection.
 * @param {string} path Collection path, e.g. "posts"
 * @param {Object} data Document data
 * @returns {Promise<import('firebase/firestore').DocumentReference>} Document reference
 */
export async function addCollectionDoc(path, data) {
  if (!db) throw new Error("Firestore is not initialized.");
  const collectionRef = collection(db, ...path.split("/"));
  return addDoc(collectionRef, data);
}

/**
 * Delete a Firestore document.
 * @param {string} path Document path
 * @returns {Promise<void>}
 */
export async function deleteDocData(path) {
  if (!db) throw new Error("Firestore is not initialized.");
  const docRef = doc(db, ...path.split("/"));
  return deleteDoc(docRef);
}

/**
 * Get documents from a collection optionally filtered by query parameters.
 * @param {string} path Collection path
 * @param {Array<{ field: string, op: FirebaseFirestore.WhereFilterOp, value: any }>} filters Optional filters
 * @param {Array<{ field: string, direction?: 'asc' | 'desc' }>} order Optional ordering
 * @param {number} limitCount Optional limit on number of documents to retrieve
 * @returns {Promise<Array<Object>>} Array of documents with IDs
 */
export async function getCollectionData(path, filters = [], order = [], limitCount = 0) {
  if (!db) throw new Error("Firestore is not initialized.");
  let collRef = collection(db, ...path.split("/"));

  const constraints = [];
  filters.forEach(({ field, op, value }) => constraints.push(where(field, op, value)));
  order.forEach(({ field, direction }) => constraints.push(orderBy(field, direction || "asc")));
  if (limitCount > 0) constraints.push(limit(limitCount));

  const q = query(collRef, ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Real-time listener to a Firestore collection with optional filters, ordering.
 * @param {string} path Collection path
 * @param {function} onUpdate Callback invoked with array of docs on update
 * @param {Array} filters Optional filters
 * @param {Array} order Optional ordering
 * @returns {function} unsubscribe function to stop listener
 */
export function subscribeCollection(path, onUpdate, filters = [], order = []) {
  if (!db) throw new Error("Firestore is not initialized.");
  let collRef = collection(db, ...path.split("/"));

  const constraints = [];
  filters.forEach(({ field, op, value }) => constraints.push(where(field, op, value)));
  order.forEach(({ field, direction }) => constraints.push(orderBy(field, direction || "asc")));

  const q = query(collRef, ...constraints);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    onUpdate(docs);
  });

  return unsubscribe;
  }
