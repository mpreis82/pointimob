import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { MdDirectionsCar, MdCropFree } from 'react-icons/md'
import { FaBed } from 'react-icons/fa'
import { grey } from '@mui/material/colors';

export default function PropertiesList({ list }) {
  const theme = useTheme();

  console.log(list)

  return (
    list.map((property, index) => (
      <Card key={index} sx={{ display: 'flex', backgroundColor: grey[100] }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={property.images.filter(image => image.isThumb)[0].src}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6" color='primary'>
              {property.initial_informations.subtype}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency', maximumFractionDigits: 0 }).format(property.financial.price)} - {property.financial.transaction}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {property.location.uf} / {property.location.city}
            </Typography>
            <Box display='flex' alignItems='center'>
              <Typography variant="subtitle1" color="text.secondary" component="div" display='flex' alignItems='center'>
                <Typography component='span' color='secondary' fontSize={18}><FaBed /></Typography> {property.rooms.bedroom} {(property.rooms.suite > 0 ? `(${property.rooms.suite} suite)` : '')}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" display='flex' alignItems='center'>
                <Typography component='span' color='secondary' fontSize={18}><MdDirectionsCar /></Typography> {property.rooms.garage}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" display='flex' alignItems='center'>
                <Typography component='span' color='secondary' fontSize={18}><MdCropFree /></Typography>{property.measures.total_area} m²
              </Typography>
            </Box>
          </CardContent>
        </Box>

      </Card>
    ))
  )
}
