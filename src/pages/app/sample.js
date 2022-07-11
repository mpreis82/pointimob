import { addDoc, collection } from "firebase/firestore"
import { Firestore } from "../../Firebase"

export default function Sample() {
  const data = [
    {
      "property_type": "Apartamento",
      "situation": "Breve lançamento",
      "order": 1
    },
    {
      "property_type": "Apartamento",
      "situation": "Em construção",
      "order": 2
    },
    {
      "property_type": "Apartamento",
      "situation": "Indefinido",
      "order": 3
    },
    {
      "property_type": "Apartamento",
      "situation": "Lançamento",
      "order": 4
    },
    {
      "property_type": "Apartamento",
      "situation": "Na planta",
      "order": 5
    },
    {
      "property_type": "Apartamento",
      "situation": "Novo",
      "order": 6
    },
    {
      "property_type": "Apartamento",
      "situation": "Pronto para morar",
      "order": 7
    },
    {
      "property_type": "Apartamento",
      "situation": "Reformado",
      "order": 8
    },
    {
      "property_type": "Apartamento",
      "situation": "Semi-novo",
      "order": 9
    },
    {
      "property_type": "Apartamento",
      "situation": "Usado",
      "order": 10
    },
    {
      "property_type": "Casa",
      "situation": "Breve lançamento",
      "order": 1
    },
    {
      "property_type": "Casa",
      "situation": "Em construção",
      "order": 2
    },
    {
      "property_type": "Casa",
      "situation": "Indefinido",
      "order": 3
    },
    {
      "property_type": "Casa",
      "situation": "Lançamento",
      "order": 4
    },
    {
      "property_type": "Casa",
      "situation": "Na planta",
      "order": 5
    },
    {
      "property_type": "Casa",
      "situation": "Novo",
      "order": 6
    },
    {
      "property_type": "Casa",
      "situation": "Pronto para morar",
      "order": 7
    },
    {
      "property_type": "Casa",
      "situation": "Reformado",
      "order": 8
    },
    {
      "property_type": "Casa",
      "situation": "Semi-novo",
      "order": 9
    },
    {
      "property_type": "Casa",
      "situation": "Usado",
      "order": 10
    },
    {
      "property_type": "Terreno",
      "situation": "Com vegetação",
      "order": 1
    },
    {
      "property_type": "Terreno",
      "situation": "Desnivelado",
      "order": 2
    },
    {
      "property_type": "Terreno",
      "situation": "Em obras",
      "order": 3
    },
    {
      "property_type": "Terreno",
      "situation": "Em preparação",
      "order": 4
    },
    {
      "property_type": "Terreno",
      "situation": "Lançamento",
      "order": 5
    },
    {
      "property_type": "Terreno",
      "situation": "Planta nativa",
      "order": 6
    },
    {
      "property_type": "Terreno",
      "situation": "Pronto para construir",
      "order": 7
    },
    {
      "property_type": "Terreno",
      "situation": "Pré Lançamento",
      "order": 8
    },
    {
      "property_type": "Terreno",
      "situation": "Semi Aterrado",
      "order": 9
    },
    {
      "property_type": "Chácara",
      "situation": "Com vegetação",
      "order": 1
    },
    {
      "property_type": "Chácara",
      "situation": "Desnivelado",
      "order": 2
    },
    {
      "property_type": "Chácara",
      "situation": "Em construção",
      "order": 3
    },
    {
      "property_type": "Chácara",
      "situation": "Indefinido",
      "order": 4
    },
    {
      "property_type": "Chácara",
      "situation": "Novo",
      "order": 5
    },
    {
      "property_type": "Chácara",
      "situation": "Planta nativa",
      "order": 6
    },
    {
      "property_type": "Chácara",
      "situation": "Pronto para construir",
      "order": 7
    },
    {
      "property_type": "Chácara",
      "situation": "Pronto para morar",
      "order": 8
    },
    {
      "property_type": "Chácara",
      "situation": "Semi Aterrado",
      "order": 9
    },
    {
      "property_type": "Sala",
      "situation": "Em construção",
      "order": 1
    },
    {
      "property_type": "Sala",
      "situation": "Indefinido",
      "order": 2
    },
    {
      "property_type": "Sala",
      "situation": "Lançamento",
      "order": 3
    },
    {
      "property_type": "Sala",
      "situation": "Novo",
      "order": 4
    },
    {
      "property_type": "Sala",
      "situation": "Reformado",
      "order": 5
    },
    {
      "property_type": "Sala",
      "situation": "Semi-novo",
      "order": 6
    },
    {
      "property_type": "Sala",
      "situation": "Usado",
      "order": 7
    }
  ]

  function upload() {
    data.forEach(async (situation) => {
      await addDoc(collection(Firestore, 'situations'), situation)
    })
  }

  return (
    <>
      <h1>Situation</h1>
      <button onClick={upload}>Carregar</button>
    </>
  )
}