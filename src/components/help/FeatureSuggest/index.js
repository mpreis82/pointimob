import { MdOutlineFavorite } from 'react-icons/md'

import HelpBasePage from '../HelpBasePage'
import HelpFormBase from '../HelpFormBase'

export default function FeatureSuggest({ open, setOpen }) {
  return (
    <HelpBasePage
      title='Enviar sugestão'
      subtitle='Envie a sua sugestão para melhorar a plataforma..'
      icon={<MdOutlineFavorite />}
      open={open}
      setOpen={setOpen}
    >
      <HelpFormBase collectionName='feature_suggest' />
    </HelpBasePage>
  )
}