import {auth, db} from './firebaseConfig';
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { doc, addDoc, collection, setDoc, deleteDoc } from "firebase/firestore";


export const login = async (username, password) => await signInWithEmailAndPassword(auth, username, password);


export const logout = async () => await signOut(auth);

export const addCompany = async (company) => {
	  await addDoc(collection(db, "companies"), company);
}

export const modifyCompany = async (id, company) => {
	  await setDoc(doc(db, "companies", id), company, { merge: true });
}
