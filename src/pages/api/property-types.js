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
    "type": "Sítio",
    "subtype": "Sítio"
  },
  {
    "id": 38,
    "type": "Sítio",
    "subtype": "Haras"
  },
  {
    "id": 39,
    "type": "Garagem",
    "subtype": "Garagem externa"
  },
  {
    "id": 40,
    "type": "Garagem",
    "subtype": "Garagem externa coberta"
  },
  {
    "id": 41,
    "type": "Garagem",
    "subtype": "Garagem interna"
  },
  {
    "id": 42,
    "type": "Fazenda",
    "subtype": "Fazenda"
  },
  {
    "id": 43,
    "type": "Fazenda",
    "subtype": "Haras"
  },
  {
    "id": 44,
    "type": "Fazenda",
    "subtype": "Pecuária"
  },
  {
    "id": 45,
    "type": "Fazenda",
    "subtype": "Lavoura"
  },
  {
    "id": 46,
    "type": "Fazenda",
    "subtype": "Mista"
  },
  {
    "id": 47,
    "type": "Chácara",
    "subtype": "Chácara"
  },
  {
    "id": 48,
    "type": "Rancho",
    "subtype": "Rancho"
  },
  {
    "id": 49,
    "type": "Pousada",
    "subtype": "Pousada"
  },
  {
    "id": 50,
    "type": "Sala",
    "subtype": "Andar comercial"
  },
  {
    "id": 51,
    "type": "Sala",
    "subtype": "Comercial"
  },
  {
    "id": 52,
    "type": "Loja",
    "subtype": "Loja"
  },
  {
    "id": 53,
    "type": "Loja",
    "subtype": "Ponto comercial"
  },
  {
    "id": 54,
    "type": "Flat",
    "subtype": "Flat"
  },
  {
    "id": 55,
    "type": "Sobrado",
    "subtype": "Alto padrão"
  },
  {
    "id": 56,
    "type": "Sobrado",
    "subtype": "Em condomínio"
  },
  {
    "id": 57,
    "type": "Sobrado",
    "subtype": "Germinado"
  },
  {
    "id": 58,
    "type": "Sobrado",
    "subtype": "Padrão"
  },
  {
    "id": 59,
    "type": "Prédio",
    "subtype": "Comercial"
  },
  {
    "id": 60,
    "type": "Prédio",
    "subtype": "Residêncial"
  },
  {
    "id": 61,
    "type": "Indústria",
    "subtype": "Indústria"
  },
  {
    "id": 62,
    "type": "Pavilhão/Galpão",
    "subtype": "Industrial"
  },
  {
    "id": 63,
    "type": "Pavilhão/Galpão",
    "subtype": "Salão comercial"
  },
  {
    "id": 64,
    "type": "Área",
    "subtype": "Comercial"
  },
  {
    "id": 65,
    "type": "Área",
    "subtype": "Industrial"
  },
  {
    "id": 66,
    "type": "Área",
    "subtype": "Residêncial"
  },
  {
    "id": 67,
    "type": "Área",
    "subtype": "Residêncial/Comercial"
  },
  {
    "id": 68,
    "type": "Área",
    "subtype": "Rural"
  },
  {
    "id": 69,
    "type": "Área",
    "subtype": "Reflorestamento"
  },
  {
    "id": 70,
    "type": "Ponto comercial",
    "subtype": "Andar comercial"
  },
  {
    "id": 71,
    "type": "Ponto comercial",
    "subtype": "Coméricio"
  },
  {
    "id": 72,
    "type": "Ponto comercial",
    "subtype": "Indústria"
  },
  {
    "id": 73,
    "type": "Sala comercial",
    "subtype": "Andar comercial"
  },
  {
    "id": 74,
    "type": "Sala comercial",
    "subtype": "Duplex"
  },
  {
    "id": 75,
    "type": "Sala comercial",
    "subtype": "Em edifício"
  },
  {
    "id": 76,
    "type": "Sala comercial",
    "subtype": "Nível de rua"
  },
  {
    "id": 77,
    "type": "Sala comercial",
    "subtype": "Sobreposta"
  },
  {
    "id": 78,
    "type": "Sala comercial",
    "subtype": "Térreo"
  },
  {
    "id": 79,
    "type": "Salão comercial",
    "subtype": "Salão comercial"
  }
]

export default function handler(req, res) {
  types.map(async (t) => {
    await addDoc(collection(Firestore, 'propery_types'), {
      id: t.id,
      type: t.type,
      subtype: t.subtype,
    })
  })
  res.status(200).json({ message: 'Property types uploaded' })
}