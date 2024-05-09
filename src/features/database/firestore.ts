import { app } from "../../config/firebase";
import { getFirestore } from "firebase/firestore";

import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

export async function readData() {
  const querySnapshot = await getDocs(collection(db, "wordList"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}

export async function addData(collection: string, document: string, payload: any) {
  const response = await setDoc(doc(db, collection, document), payload, {
    merge: true,
  });
  return response;
}

export async function deleteData(collection: string, document: string) {
  await deleteDoc(doc(db, collection, document))

}

export async function readUserData(uid: string) {
  const res = await getDoc(doc(db, "users", uid));
  return res;
}
