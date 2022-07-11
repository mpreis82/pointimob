import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { MdThumbUp } from 'react-icons/md'

export default function HelpSended() {
  return (
    <Box px={3} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography fontSize={48} color='secondary' lineHeight={1}>
        <MdThumbUp />
      </Typography>

      <Typography variant='h4' color='secondary'>
        Recebi a sua mensagem!
      </Typography>

      <Typography variant='subtitle1'>
        Muito obrigado por ajudar a melhorar a plataforma.
      </Typography>
    </Box>
  )
}