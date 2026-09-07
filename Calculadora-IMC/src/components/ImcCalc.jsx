import Button from './Button.jsx'
import { useState } from 'react'
import './ImcCalc.css'

const ImcCalc = ({calcImc}) => {

    const [heightUser, settHeightUser] = useState("")
    const [weightUser, settWeightUser] = useState("")

    const clearForm = (e) => {
        e.preventDefault()
        settHeightUser("")
        settWeightUser("")
    }

    //função para não aceitar valores diferentes de numeros ou da vigula
    const valueDigits = (text) => {
        return text.replace(/[^0-9,]/g, "") //todo digito que for diferente de um numero ou uma virgula passa não é computado 
    }

    const handleHeightChange = (e) => {
        const updateValueHeight = valueDigits(e.target.value)
        settHeightUser(updateValueHeight)
    }

    const handleWeightChange = (e) => {
        const updateValueWeight = valueDigits(e.target.value)
        settWeightUser(updateValueWeight)
    }

    return (
        <div id='calc-container'>
            <h2>Calculadore de IMC</h2>
            <form id="imc-form">
                <div className="form-inputs">
                    <div className="form-control">
                        <label htmlFor="height">Altura (m): </label>
                        <input
                            type="text"
                            name='height'
                            id='height'
                            placeholder='Exemplo: 1,75'
                            onChange={(e) => handleHeightChange(e)}
                            value={heightUser} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="weight">Peso (Kg): </label>
                        <input
                            type="text"
                            name='weight'
                            id='weight'
                            placeholder='Exemplo: 80,50'
                            onChange={(e) => handleWeightChange(e)}
                            value={weightUser} />
                    </div>
                </div>

                <div className='action-control'>
                    <Button id='calc-btn' text='Calcular' action={(e) => calcImc(e, heightUser, weightUser)}/>
                    <Button id='clear-btn' text='Limpar' action={clearForm} />
                </div>
            </form>
        </div>
    )
}

export default ImcCalc