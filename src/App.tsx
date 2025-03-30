import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Column, Grid } from '@carbon/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Grid>
        <Column md={4} lg={4}>Colum is 4</Column>
        <Column md={4} lg={4}>Colum is 4</Column>
        <Column md={4} lg={4}>Colum is 4</Column>
        <Column md={4} lg={4}>Colum is 4</Column>
      </Grid>
    </>
  )
}

export default App
