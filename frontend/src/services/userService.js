// src/services/userService.js
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Check if user document exists in Firestore
export const checkUserExists = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

// Save new user data after first login
export const createUser = async (uid, userData) => {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, {
    ...userData,
    createdAt: new Date().toISOString(),
  });
};