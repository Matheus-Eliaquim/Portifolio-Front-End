import Button from "./Button.jsx"
import './ImcTable.css'

const ImcTable = ({ data, imc, info, infoClass, reset }) => {
  return (
    <div id="result-container">

      <p id="imc-number">Seu IMC: <span className={infoClass}> {imc} </span></p>
      <p id="imc-info">Situação atual: <span className={infoClass}>{info}</span></p>
      <h3>Classificações:</h3>

      <div id="imc-table">
        <div id="table-header">
          <h4>IMC</h4>
          <h4>Classificação</h4>
          <h4>Obesidade</h4>
        </div>
        {data.map((item) => (  
          <div className="table-data" key={item.info} >
            <p> {item.classification} </p>
            <p> {item.info} </p>
            <p> {item.obesity} </p>             
          </div>        
        ))}
      </div>
      <Button id="back-btn" text="Voltar" action={reset}/>
    </div>
  )
}

export default ImcTable