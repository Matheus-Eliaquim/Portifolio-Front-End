import ImcCalc from './components/ImcCalc.jsx'
import ImcTable from './components/ImcTable.jsx'
import { useState } from 'react'
import {data} from './data/data.js'
import './App.css'

function App() {
  const [imc, setImc] = useState("")
  const [info, setInfo] = useState("")
  const [infoClass, setInfoClass] = useState("")

  const calcImc = (e, heightUser, weightUser) => {
    e.preventDefault()    
    if (!weightUser || !heightUser) return

    const heightFloat = +heightUser.replace(",", ".")
    const weightFloat = +weightUser.replace(",", ".")

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1)

    setImc(imcResult)

    data.forEach((item) => {
      if (imcResult >= item.min && imcResult <= item.max) {
        setInfo(item.info)
        setInfoClass(item.infoClass)
      }
    })
  }

  const resetTable = (e) => {
    e.preventDefault()

    setImc("")
    setInfo("")
    setInfoClass("")
  }

  return (
    <div className='container'>
      {!imc ? <ImcCalc calcImc = {calcImc}/> : <ImcTable data={data} imc={imc} info={info} infoClass={infoClass} reset={resetTable}/>}   
    </div>
  )
}

export default App
