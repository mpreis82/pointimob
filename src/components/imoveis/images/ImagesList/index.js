import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { deleteObject, getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Box } from '@mui/system'
import { Firestore, Storage } from '../../../../Firebase'
import ImageItem from '../ImageItem'
import ImagesAdd from '../ImagesAdd'

export default function ImagesList({ propertyListImages, setPropertyListImages }) {
  const [propertyId, setPropertyId] = useState('')

  const router = useRouter()

  useEffect(async () => {
    if (!router.isReady) return
    if (router.query.id) setPropertyId(router.query.id)
  }, [router.isReady])

  async function addImages(files) {
    if (propertyId) {
      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (!docSnap.exists()) return

      const images = Promise.all(Array.from(files).map(async (file, index) => {
        const storageRef = ref(Storage, `imoveis/images/${propertyId}/${file.name}`)
        const uploadResult = await uploadBytes(storageRef, file)
        return {
          isThumb: index == 0,
          name: uploadResult.ref.name,
          fullPath: uploadResult.ref.fullPath,
          bucket: uploadResult.ref.bucket,
          src: await getDownloadURL(ref(Storage, uploadResult.ref.fullPath))
        }
      }))

      await updateDoc(refDoc, { images: [...propertyListImages, ... await images] })

      setPropertyListImages([...propertyListImages, ... await images])

      document.getElementsByTagName('form')[0].reset()
    }
  }

  async function deleteImage(image) {
    if (propertyId) {
      const newList = propertyListImages.filter(imageList => imageList != image)

      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (!docSnap.exists()) return

      const storageRef = ref(Storage, `imoveis/images/${propertyId}/${image.name}`)

      await deleteObject(storageRef)

      await updateDoc(refDoc, { images: newList })

      setPropertyListImages(newList)
    }
  }

  async function deleteAllImages() {
    if (propertyId) {
      const listRef = ref(Storage, `imoveis/images/${propertyId}`)
      const listResult = await listAll(listRef)
      listResult.items.forEach(async (item) => deleteObject(item))

      const refDoc = doc(Firestore, 'properties', propertyId)

      const docSnap = await getDoc(refDoc)

      if (docSnap.exists() && docSnap.data().images) {
        await updateDoc(refDoc, { images: [] })
        setPropertyListImages([])
      }
    }
  }

  function handleImobImagesChange(event) {
    const files = event.target.files
    addImages(files)
  }

  function handleImageAddMoreChange(event) {
    const files = event.target.files
    addImages(files)
  }

  async function handleRemoveImage(image) {
    deleteImage(image)
  }

  function handleImageRemoveAll() {
    deleteAllImages()
  }

  return (
    <Box display='flex' alignItems='center' flexDirection='column' p={3}>
      {(propertyListImages.length
        ? <ImageItem propertyListImages={propertyListImages} handleRemoveImage={handleRemoveImage} handleImageRemoveAll={handleImageRemoveAll} handleImageAddMoreChange={handleImageAddMoreChange} />
        : <ImagesAdd handleImobImagesChange={handleImobImagesChange} />
      )}
    </Box>
  )
}