import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { MdOutlineSentimentDissatisfied } from 'react-icons/md'

export default function FeatureSuggestSendError() {
  return (
    <Box px={3} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography fontSize={48} color='secondary' lineHeight={1}><MdOutlineSentimentDissatisfied /></Typography>
      <Typography variant='h4' color='secondary'>Algo deu errado!</Typography>
      <Typography variant='subtitle1'>Mas não se preocupe. O erro já foi identificado e estou corrigindo.</Typography>
    </Box>
  )
}