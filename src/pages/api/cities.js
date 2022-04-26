import { collection, addDoc } from 'firebase/firestore'
import { Firestore } from '../../Firebase'

const ufList = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

export default async function handler(req, res) {
  const result = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/sp/distritos')
  const data = await result.json()
  const cidades = data.map(c => c.municipio.nome)

  res.json([...new Set(cidades)])

  // types.map(async (t) => {
  //   await addDoc(collection(Firestore, 'propery_types'), {
  //     id: t.id,
  //     type: t.type,
  //     subtype: t.subtype,
  //   })
  // })
  // res.status(200).json({ message: 'Property types uploaded' })
}