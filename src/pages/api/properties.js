import { doc, getDoc, collection, addDoc } from 'firebase/firestore'
import { Firestore } from '../../Firebase'

export default async function handler(req, res) {
  const docRef = doc(Firestore, 'properties', 'LrkblTOZLbp1KgZnqwNw')
  const docSnap = await getDoc(docRef)
  const newRef = await addDoc(collection(Firestore, 'properties'), docSnap.data())

  res.status(200).json(newRef.id)
}