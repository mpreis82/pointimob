import { useState } from 'react'
import { useRouter } from 'next/router'
import { deleteObject, ref, listAll } from 'firebase/storage';
import { deleteDoc, doc } from 'firebase/firestore';

import { Button, Box, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { blue, grey } from '@mui/material/colors';
import { MdDirectionsCar, MdCropFree, MdModeEdit, MdDelete } from 'react-icons/md'
import { FaBed } from 'react-icons/fa'

import { Firestore, Storage } from '../../../../Firebase'

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
]

const ITEM_HEIGHT = 48;

export default function PropertiesList({ list }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)
  const [propertyAction, setPropertyAction] = useState()
  const open = Boolean(anchorEl);

  const router = useRouter()

  function editProperty(property) {
    router.push(`/imoveis/editar/${property.docId}/informacoes`)
  }

  async function deleteProperty(property) {
    try {
      const imageStorageRef = ref(Storage, `imoveis/images/${property.docId}`)
      const imageStorageList = await listAll(imageStorageRef)
      if (imageStorageList.items.length) {
        imageStorageList.items.forEach(item => deleteObject(item))
      }

      const planStorageRef = ref(Storage, `imoveis/plans/${property.docId}`)
      const planStorageList = await listAll(planStorageRef)
      if (planStorageList.items.length) {
        planStorageList.items.forEach(item => deleteObject(item))
      }

      await deleteDoc(doc(Firestore, 'properties', property.docId))

      return true

    } catch (err) {
      return false
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEditClick(property) {
    editProperty(property)
    setAnchorEl(null)
  }

  function handleDeleteClick(property) {
    setOpenDialog(true)
    setPropertyAction(property)
    setAnchorEl(null)
  }

  async function handleDialogDeleteClick() {
    setOpenDialog(false)
    try {
      const result = await deleteProperty(propertyAction)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {list.map((property, index) => (
        <Card key={index} sx={{ display: 'flex', backgroundColor: grey[100] }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={property.images.filter(image => image.isThumb)[0].src}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6" color='secondary' mb={1}>
                {`${property.initial_informations.subtype.type} - ${property.initial_informations.subtype.subtype}`}
              </Typography>

              <Typography color="text.secondary" fontWeight='bold' component="div">
                {new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency', maximumFractionDigits: 0 }).format(property.financial.price)} - {property.financial.transaction}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" component="div" mb={1}>
                {property.location.uf} / {property.location.city}
              </Typography>

              <Box display='flex' alignItems='center'>
                <Typography variant="subtitle1" color="text.secondary" component="div" display='flex' alignItems='center' mr={2}>
                  <Typography component='span' color={blue[600]} fontSize={18} mr={1} display='flex' alignItems='center'><FaBed /></Typography>
                  <Typography component='span' lineHeight={1}>{property.rooms.bedroom} {(property.rooms.suite > 0 ? `(${property.rooms.suite} suite)` : '')}</Typography>
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" component="div" display='flex' alignItems='center' mr={2}>
                  <Typography component='span' lineHeight={1} color={blue[600]} fontSize={18} mr={1} display='flex' alignItems='start'><MdDirectionsCar /></Typography>
                  <Typography component='span' lineHeight={1}>{property.rooms.garage}</Typography>
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" component="div" display='flex' alignItems='center' mr={2}>
                  <Typography component='span' lineHeight={1} color={blue[600]} fontSize={18} mr={1} display='flex' alignItems='center'><MdCropFree /></Typography>
                  <Typography component='span' lineHeight={1}>{property.measures.total_area} m²</Typography>
                </Typography>
              </Box>
            </CardContent>
          </Box>

          <Box ml='auto' width='45px' paddingTop={1.5}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="long-menu"
              MenuListProps={{ 'aria-labelledby': 'long-button', }}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
              transformOrigin={{ vertical: 'top', horizontal: 'right', }}
              open={open}
              onClose={handleClose}
              PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch', backgroundColor: grey[900] }, }}
            >
              <MenuItem key='0' onClick={() => handleEditClick(property)} sx={{ ":hover": { backgroundColor: grey[800], } }}>
                <Typography color={'#fff'} fontSize={16} display='flex' alignItems='center'>
                  <MdModeEdit fontSize={18} /> <Typography component={'span'} ml={1} fontSize={16}>Editar</Typography>
                </Typography>
              </MenuItem>

              <MenuItem key='1' onClick={() => handleDeleteClick(property)} sx={{ ":hover": { backgroundColor: grey[800] } }} >
                <Typography color={'#fff'} fontSize={16} display='flex' alignItems='center'>
                  <MdDelete fontSize={18} /> <Typography component={'span'} ml={1} fontSize={16}>Excluir</Typography>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Card >
      ))}

      <Dialog open={openDialog}>
        <DialogTitle>Deseja excluir?</DialogTitle>

        <DialogContent>
          <DialogContentText>Todas as informações do imóvel serão excluídas e não poderão ser recuperadas.</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color='info' onClick={() => setOpenDialog(false)}>Não</Button>
          <Button variant='contained' color='error' onClick={handleDialogDeleteClick}>Sim</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
