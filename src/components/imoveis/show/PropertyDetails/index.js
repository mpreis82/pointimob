import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { Box, Modal, Typography, Button, Menu, MenuList, MenuItem, Divider, Avatar, Table, TableBody, TableContainer, TableRow, TableCell } from '@mui/material'
import { grey, pink, purple } from '@mui/material/colors'
import { MdKeyboardArrowDown, MdDirectionsCar, MdCropFree, MdOutlineAttachMoney, MdShower } from 'react-icons/md'
import { FaBed } from 'react-icons/fa'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Firestore } from '../../../../Firebase'

export default function PropertyDetails({ property, openPropertyDetails, setOpenPropertyDetails, setIsBackdrop, setTrigger, trigger }) {
  const [anchorOptionsMenu, setAnchorOptionsMenu] = useState(null)

  const optionsMenuIsOpen = Boolean(anchorOptionsMenu)

  const router = useRouter()

  const isTerrain = (property.initial_informations.subtype.type == 'Terreno')
  const isCommercialRoom = (property.initial_informations.subtype.type == 'Sala')
  const isTerrainOrCommercialRoom = (property.initial_informations.subtype.type == 'Terreno' || property.initial_informations.subtype.type == 'Sala')

  function getPropertyCreateDate() {
    let createDate = new Date(1970, 0, 1)
    createDate.setSeconds(property.register_status.created_date.seconds)
    return createDate.toLocaleDateString('pt-BR', { timeZone: 'UTC', dateStyle: 'short' })
  }

  function getPropertyUpdateDate() {
    let updateDate = new Date(1970, 0, 1)
    updateDate.setSeconds(property.register_status.update_date.seconds)
    return updateDate.toLocaleDateString('pt-BR', { timeZone: 'UTC', dateStyle: 'short' })
  }

  async function handleChangeStatusClick(status) {
    setIsBackdrop(true)
    const ref = doc(Firestore, 'properties', property.docId)
    await updateDoc(ref, {
      register_status: { ...property.register_status, status: status }
    })
    setTrigger(!trigger)
    setOpenPropertyDetails(false)
    setIsBackdrop(false)
  }

  if (false) {
    return (
      <h1>Sample {isTerrainOrCommercialRoom ? 'true' : 'false'}</h1>
    )
  }


  return (
    <Modal open={openPropertyDetails} onClose={() => setOpenPropertyDetails(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        position='relative'
        width={'80%'}
        maxHeight={'90vh'}
        p={2}
        borderRadius={2}
        sx={{
          backgroundColor: '#fff',
          border: 'none',
          outline: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          '::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: grey[300],
            borderRadius: 3
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: pink[400],
            borderRadius: 3,
            cursor: 'pointer',
            transition: {}
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: pink[500],
          }
        }}
      >
        {/* *************  HEADER ************* */}
        <Box display='flex' alignItems='center' justifyContent={'space-between'} pb={2} mb={4} borderBottom={1} borderColor={grey[500]}>
          <Box>
            <Typography fontSize={'1.25rem'} fontWeight='bold' >{property.initial_informations.subtype.type} - {property.initial_informations.subtype.subtype}</Typography>
            <Typography>{property.location.city} / {property.location.uf} </Typography>
          </Box>

          <Button
            variant='outlined'
            id="options-button"
            aria-controls={optionsMenuIsOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={optionsMenuIsOpen ? 'true' : undefined}
            onClick={(event) => setAnchorOptionsMenu(event.currentTarget)}
            sx={{ textTransform: 'none' }}
          >
            Opções
            <MdKeyboardArrowDown style={{ marginLeft: '4px' }} />
          </Button>

          <Menu
            id='options-menu'
            anchorEl={anchorOptionsMenu}
            open={optionsMenuIsOpen}
            onClose={() => setAnchorOptionsMenu(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
            MenuListProps={{ 'aria-labelledby': 'options-menu', }}
          >
            <MenuList>
              <MenuItem dense={true} onClick={() => { alert('ver imovel') }}>Ver imóvel no site</MenuItem>
              <Divider />
              <MenuItem dense={true} onClick={() => { router.push(`/imoveis/editar/${property.docId}/informacoes`) }}>Editar dados</MenuItem>
              <MenuItem dense={true} onClick={() => { router.push(`/imoveis/editar/${property.docId}/imagens`) }}>Adicionar fotos</MenuItem>
              <MenuItem dense={true}>Duplicar imóvel</MenuItem>
              <Divider />
              {(property.register_status.status != 'done' && <MenuItem dense={true} onClick={() => handleChangeStatusClick('done')} >Mover para ativos</MenuItem>)}
              {(property.financial.transaction == 'Venda' && property.register_status.status != 'sold' && (<MenuItem dense={true} onClick={() => handleChangeStatusClick('sold')}>Mover para vendidos</MenuItem>))}
              {(property.financial.transaction == 'Aluguel' && property.register_status.status != 'rented' && <MenuItem dense={true} onClick={() => handleChangeStatusClick('rented')}>Mover para alugados</MenuItem>)}
              {(property.register_status.status != 'inactive' && <MenuItem dense={true} onClick={() => handleChangeStatusClick('inactive')} >Mover para inativos</MenuItem>)}
            </MenuList>
          </Menu>
        </Box>

        {/* *************  IMAGES ************* */}
        <Box display='grid' gridTemplateColumns='1fr 1fr 1fr' gap={1} mb={4}>
          {property.images.map((image, index) => {
            if (index < 3) {
              return (
                <Box key={index} position='relative' lineHeight={0}>
                  <Image layout='responsive' width='100%' height='100%' src={image.src} priority />
                </Box>
              )
            }
          })}
        </Box>

        {/* *************  INFOS ************* */}
        <Box width='100%' maxWidth='100%' display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between' mb={4}>

          <Box minWidth='180px' mb={2} display='flex' alignItems='center'>
            <Box width={40} height={40} bgcolor={grey[300]} borderRadius='50%' display='flex' alignItems='center' justifyContent='center'>
              <MdOutlineAttachMoney fontSize={20} />
            </Box>
            <Box ml={1}>
              <Typography variant='subtitle2'>{property.financial.transaction}</Typography>
              <Typography>
                {new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency', maximumFractionDigits: 0 }).format(property.financial.price)}
              </Typography>
            </Box>
          </Box>

          {!isTerrainOrCommercialRoom && (
            <Box minWidth='180px' mb={2} display='flex' alignItems='center'>
              <Box width={40} height={40} bgcolor={grey[300]} borderRadius='50%' display='flex' alignItems='center' justifyContent='center'>
                <FaBed fontSize={20} />
              </Box>
              <Box ml={1}>
                <Typography variant='subtitle2'>Dormitórios</Typography>
                <Typography>{property.rooms.bedroom}{(property.rooms.suite > 0 ? ` (sendo ${property.rooms.suite} suíte)` : '')}</Typography>
              </Box>
            </Box>
          )}

          {!isTerrain && (
            <>
              <Box minWidth='180px' mb={2} display='flex' alignItems='center'>
                <Box width={40} height={40} bgcolor={grey[300]} borderRadius='50%' display='flex' alignItems='center' justifyContent='center'>
                  <MdShower fontSize={20} />
                </Box>
                <Box ml={1}>
                  <Typography variant='subtitle2'>Banheiros</Typography>
                  <Typography>{property.rooms.bathroom}</Typography>
                </Box>
              </Box>


              <Box minWidth='180px' mb={2} display='flex' alignItems='center'>
                <Box width={40} height={40} bgcolor={grey[300]} borderRadius='50%' display='flex' alignItems='center' justifyContent='center'>
                  <MdDirectionsCar fontSize={20} />
                </Box>
                <Box ml={1}>
                  <Typography variant='subtitle2'>Garagens</Typography>
                  <Typography>{property.rooms.garage}</Typography>
                </Box>
              </Box>
            </>
          )}

          <Box minWidth='180px' mb={2} display='flex' alignItems='center'>
            <Box width={40} height={40} bgcolor={grey[300]} borderRadius='50%' display='flex' alignItems='center' justifyContent='center'>
              <MdCropFree fontSize={20} />
            </Box>
            <Box ml={1}>
              <Typography variant='subtitle2'>Área total</Typography>
              <Typography>{property.measures.total_area} m²</Typography>
            </Box>
          </Box>
        </Box>

        <Box display='grid' gap={5} sx={{ gridTemplateColumns: { sm: '1fr', md: '1fr 1fr' } }} >
          <Box>
            {/* *************  CHARACTERISTICS ************* */}
            <Box mb={2} pb={2} borderBottom={1} borderColor={grey[300]}>
              <Typography variant='subtitle2'>Características do imovel</Typography>
              <Box component={'ul'} maxWidth={600} sx={{ columns: 2 }}>
                {property.characteristics.filter(characteristic => characteristic.checked == true)
                  .map((characteristic, index) => (
                    <Box key={index} component='li' sx={{ listStyle: 'disc inside none' }} >{characteristic.characteristic}</Box>
                  ))}
              </Box>
            </Box>

            {/* *************  ROOMS ************* */}
            {!isTerrain && (
              <Box mb={2} pb={2} borderBottom={1} borderColor={grey[300]}>
                <Typography variant='subtitle2'>Cômodos</Typography>
                <Box component={'ul'} maxWidth={600} sx={{ columns: 2 }}>
                  <Box component='li' sx={{ listStyle: 'disc inside none' }} >{property.rooms.garage} garagens</Box>
                  {!isCommercialRoom && (
                    <>
                      <Box component='li' sx={{ listStyle: 'disc inside none' }}>{property.rooms.bathroom} dormitórios</Box>
                      <Box component='li' sx={{ listStyle: 'disc inside none' }}>{property.rooms.suite} suíte</Box>
                    </>
                  )}
                  <Box component='li' sx={{ listStyle: 'disc inside none' }}>{property.rooms.bedroom == '' ? 0 : property.rooms.bedroom} banheiros</Box>
                  {isCommercialRoom && (
                    <Box component='li' sx={{ listStyle: 'disc inside none' }}>{property.rooms.office} escritórios</Box>
                  )}
                </Box>
              </Box>
            )}

            {/* *************  NEARBYS ************* */}
            <Box mb={2} pb={2} borderBottom={1} borderColor={grey[300]}>
              <Typography variant='subtitle2'>Proximidades</Typography>
              <Box component={'ul'} maxWidth={600} sx={{ columns: 2 }}>
                {property.nearbys.filter(nearby => nearby.checked == true)
                  .map((nearby, index) => (
                    <Box key={index} component='li' sx={{ listStyle: 'disc inside none' }}>{nearby.name}</Box>
                  ))}
              </Box>
            </Box>

            {/* *************  DESCRIPTION ************* */}
            <Box mb={2} pb={2} borderBottom={1} borderColor={grey[300]}>
              <Typography variant='subtitle2'>Descrição do imóvel</Typography>
              <div dangerouslySetInnerHTML={{ __html: property.description.description }}></div>
            </Box>

            {/* *************  LOCATION ************* */}
            <Box mb={2} pb={2} borderBottom={1} borderColor={grey[300]}>
              <Typography variant='subtitle2'>Localização</Typography>
              <Typography>{property.location.street}, {property.location.city} / {property.location.uf}, {property.location.zipcode.replace(/(\d{5})(\d{3})/, '$1-$2')}</Typography>
            </Box>
          </Box>

          {/* *************  DETAILS ************* */}
          <Box>
            <Typography variant='subtitle2' mb={2}>Detalhes do imóvel</Typography>

            <Box mb={2}>
              <Typography variant='subtitle2' mb={1}>Corretor responsável</Typography>
              <Box display='flex' alignItems='center'>
                <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: purple[800] }}>
                  {property.initial_informations.user.charAt(0)}
                </Avatar>
                <Typography ml={1}>{property.initial_informations.user}</Typography>
              </Box>
            </Box>

            <Box>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[200] } }}>
                      <TableCell sx={{ fontWeight: '500' }}>Proprietário</TableCell>
                      <TableCell>{property.initial_informations.people}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[200] } }}>
                      <TableCell sx={{ fontWeight: '500' }}>Perfil</TableCell>
                      <TableCell>{property.initial_informations.profile}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[200] } }}>
                      <TableCell sx={{ fontWeight: '500' }}>Situação</TableCell>
                      <TableCell>{property.initial_informations.situation}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[200] } }}>
                      <TableCell sx={{ fontWeight: '500' }}>Data de cadastro</TableCell>
                      <TableCell>{getPropertyCreateDate()}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[200] } }}>
                      <TableCell sx={{ fontWeight: '500' }}>Data de atualização</TableCell>
                      <TableCell>{getPropertyUpdateDate()}</TableCell>
                    </TableRow>

                    <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: grey[200] } }}>
                      <TableCell sx={{ fontWeight: '500' }}>Status do cadastro</TableCell>
                      <TableCell>{(property.register_status.status == 'done' ? 'Completo' : 'Pendente')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal >
  )
}