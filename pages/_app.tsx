import '../styles/globals.css'
import "../styles/theme.css"
import "../styles/classes.css"
import '../components/BSpinner.css'
import "../components/BTableHeader.css"
import "../components/BTableRow.css"
import type { AppProps } from 'next/app'
import ioc, { ContainerProvider } from '../services'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ContainerProvider container={ioc}>
          <div className="std background" app-theme="light">
              <Component {...pageProps} />
          </div>
      </ContainerProvider>
  )
}

export default MyApp
