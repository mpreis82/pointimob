import { MdOutlineWarning } from 'react-icons/md'

import HelpBasePage from '../HelpBasePage'
import HelpFormBase from '../HelpFormBase'

export default function ReportProblem({ open, setOpen }) {
  return (
    <HelpBasePage
      title='Reportar um problema'
      subtitle='Informe o problema que você encontrou.'
      icon={<MdOutlineWarning />}
      open={open}
      setOpen={setOpen}
    >
      <HelpFormBase collectionName='report_problem' />
    </HelpBasePage>
  )
}