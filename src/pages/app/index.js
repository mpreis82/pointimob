import { useEffect, useState } from 'react'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { Firestore } from "../../Firebase"

export default function Home() {
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(async () => {
    const q = query(collection(Firestore, 'propery_types'), orderBy('id'))
    const querySnapshot = await getDocs(q)

    let result = []

    let type = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()

      if (data.type != type) {
        result.push({ level: 0, value: data.type })
        type = data.type
      }
      result.push({ level: 1, value: data.subtype })
    })

    setPropertyTypes(result)
  }, []);

  return (
    <>
      <h1>Test firebase</h1>
      <h2>Lista de tipos e subtipos</h2>

      {propertyTypes.map((t, index) => {
        if (t.level == 0) return <strong>{t.value}</strong>
        return <p>{t.value}</p>
      }
      )}

    </>
  )
}