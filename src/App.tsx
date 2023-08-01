import React from 'react'
import RouteApp from './routes'
import './app.scss'
import Loading from './components/loading'
import useAppContext from './store/useAppContext'

const App: React.FC = () => {
  const { isLoading } = useAppContext()

  return (
    <>
      <RouteApp />
      {isLoading && <Loading />}
    </>
  )
}

export default App
