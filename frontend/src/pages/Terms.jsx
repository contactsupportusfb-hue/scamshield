import LegalPage from '../components/LegalPage'
import { LEGAL } from '../data/pages'

export default function Terms() {
  return <LegalPage doc={LEGAL.terms} />
}
