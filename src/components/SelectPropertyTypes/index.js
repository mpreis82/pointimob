import React from 'react'
import { useState, useEffect } from 'react'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import { Box } from "@mui/system"
import { Select, FormControl, FormHelperText } from '@mui/material'
import { Firestore } from '../../Firebase'

export default function SelectPropertyTypes({ value, setValue, error = false, message = '', validateBlur, size }) {
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(async () => {
    const q = query(collection(Firestore, 'propery_types'), orderBy('id'))
    const querySnapshot = await getDocs(q)

    let container = []
    let options = []
    let type = ''

    querySnapshot.forEach(doc => {
      const value = JSON.stringify({ docId: doc.id, id: doc.data().id, type: doc.data().type, subtype: doc.data().subtype })

      if (type == '') {
        type = doc.data().type
        options.push(React.createElement('option', { value: value, key: doc.id }, doc.data().subtype))
      } else if (type == doc.data().type) {
        options.push(React.createElement('option', { value: value, key: doc.id }, doc.data().subtype))
      } else {
        container.push(React.createElement('optgroup', { label: type, key: type }, options))
        options = []
        type = doc.data().type
        options.push(React.createElement('option', { value: value, key: doc.id }, doc.data().subtype))
      }
    })
    setPropertyTypes(container)
  }, []);


  return (
    <FormControl fullWidth>
      <Box component='label' htmlFor="" fontWeight='bold' mb={1}>Tipo/Subtipo</Box>
      <Select native name="subtype" value={value} onChange={setValue} error={error} onBlur={validateBlur} size={size ?? 'medium'}>
        <option value={'Selecione'}>Selecione</option>
        {propertyTypes.map(t => t)}
      </Select>
      <FormHelperText error={error}>{error ? message : ''}</FormHelperText>
    </FormControl >
  )
}