import { collection, addDoc } from 'firebase/firestore'
import { Firestore } from '../../Firebase'

const types = [
  {
    "id": 1,
    "type": "Apartamento",
    "subtype": "Alto Padrão"
  },
  {
    "id": 2,
    "type": "Apartamento",
    "subtype": "Cobertura"
  },
  {
    "id": 3,
    "type": "Apartamento",
    "subtype": "Cobertura Duplex"
  },
  {
    "id": 4,
    "type": "Apartamento",
    "subtype": "Cobertura Triplex"
  },
  {
    "id": 5,
    "type": "Apartamento",
    "subtype": "Duplex"
  },
  {
    "id": 6,
    "type": "Apartamento",
    "subtype": "Flat"
  },
  {
    "id": 7,
    "type": "Apartamento",
    "subtype": "Garden"
  },
  {
    "id": 8,
    "type": "Apartamento",
    "subtype": "Loft"
  },
  {
    "id": 9,
    "type": "Apartamento",
    "subtype": "Padrão"
  },
  {
    "id": 10,
    "type": "Apartamento",
    "subtype": "Penthouse"
  },
  {
    "id": 11,
    "type": "Apartamento",
    "subtype": "Kitnet"
  },
  {
    "id": 12,
    "type": "Apartamento",
    "subtype": "Térreo"
  },
  {
    "id": 13,
    "type": "Apartamento",
    "subtype": "Triplex"
  },
  {
    "id": 14,
    "type": "Apartamento",
    "subtype": "Conjugado"
  },
  {
    "id": 15,
    "type": "Apartamento",
    "subtype": "Cobertura Linear"
  },
  {
    "id": 16,
    "type": "Casa",
    "subtype": "Alto Padrão"
  },
  {
    "id": 17,
    "type": "Casa",
    "subtype": "Alvenaria"
  },
  {
    "id": 18,
    "type": "Casa",
    "subtype": "Em condomínio"
  },
  {
    "id": 19,
    "type": "Casa",
    "subtype": "Germinada"
  },
  {
    "id": 20,
    "type": "Casa",
    "subtype": "Linear"
  },
  {
    "id": 21,
    "type": "Casa",
    "subtype": "Madeira"
  },
  {
    "id": 22,
    "type": "Casa",
    "subtype": "Mista"
  },
  {
    "id": 23,
    "type": "Casa",
    "subtype": "Padrão"
  },
  {
    "id": 24,
    "type": "Casa",
    "subtype": "Kitnet"
  },
  {
    "id": 25,
    "type": "Casa",
    "subtype": "Sobrado"
  },
  {
    "id": 26,
    "type": "Casa",
    "subtype": "Sobreposta"
  },
  {
    "id": 27,
    "type": "Casa",
    "subtype": "Térrea"
  },
  {
    "id": 28,
    "type": "Casa",
    "subtype": "Triplex"
  },
  {
    "id": 29,
    "type": "Casa",
    "subtype": "Vila"
  },
  {
    "id": 30,
    "type": "Casa",
    "subtype": "Pré-moldada"
  },
  {
    "id": 31,
    "type": "Casa",
    "subtype": "Sobreloja"
  },
  {
    "id": 32,
    "type": "Casa",
    "subtype": "Chalé"
  },
  {
    "id": 33,
    "type": "Terreno",
    "subtype": "Em condomínio"
  },
  {
    "id": 34,
    "type": "Terreno",
    "subtype": "Lote"
  },
  {
    "id": 35,
    "type": "Terreno",
    "subtype": "Tereno"
  },
  {
    "id": 36,
    "type": "Terreno",
    "subtype": "Em loteamento"
  },
  {
    "id": 37,
    "type": "Chácara",
    "subtype": "Chácara"
  },
  {
    "id": 38,
    "type": "Sala",
    "subtype": "Andar comercial"
  },
  {
    "id": 39,
    "type": "Sala",
    "subtype": "Comercial"
  },
  {
    "id": 40,
    "type": "Loja",
    "subtype": "Loja"
  },
  {
    "id": 41,
    "type": "Loja",
    "subtype": "Ponto comercial"
  }
]

export default function handler(req, res) {
  types.map(async (t) => {
    const doc = await addDoc(collection(Firestore, 'propery_types'), {
      id: t.id,
      type: t.type,
      subtype: t.subtype,
    })
    console.log(doc)
  })
  res.status(200).json({ message: 'Property types uploaded' })
}