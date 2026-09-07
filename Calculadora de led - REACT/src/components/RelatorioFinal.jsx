import './responsividade.css' // Estilos de responsividade
import './RelatorioFinal.css' // Estilos do componente

const RelatorioFinal = ({ fontes = {}, rolo = 0, totalMetros = 0 }) => {

    const fonte200 = fontes.fonte200W || 0
    const fonte150 = fontes.fonte150W || 0
    const fonte100 = fontes.fonte100W || 0
    const fonte72 = fontes.fonte72W || 0
    const fonte60 = fontes.fonte60W || 0
    const fonte48 = fontes.fonte48W || 0
    const fonte36 = fontes.fonte36W || 0 
    const fonte24 = fontes.fonte24W || 0
    const fonte18 = fontes.fonte18W || 0

    const rolos = rolo > 0 ? Math.ceil(totalMetros / rolo) : 0
    const metragem = Number(totalMetros)


    return (
        <div id='relatorio-final'>
            <p>Rolos de {rolo}m: {rolos} Rolos</p>
            <p>Metragem total: {metragem.toFixed(2)}m</p>
            <div>
                {fonte200 > 0 && (<p style={{ display: "block" }}> Fontes de 200W: {(fonte200)}</p>)}
                {fonte150 > 0 && (<p style={{ display: "block" }}> Fontes de 150W: {fonte150}</p>)}
                {fonte100 > 0 && (<p style={{ display: "block" }}> Fontes de 100W: {fonte100}</p>)}
                {fonte72 > 0 && (<p style={{ display: "block" }}> Fontes de 72W: {fonte72}</p>)}
                {fonte60 > 0 && (<p style={{ display: "block" }}> Fontes de 60W: {fonte60}</p>)}
                {fonte48 > 0 && (<p style={{ display: "block" }}> Fontes de 48W: {fonte48}</p>)}
                {fonte36 > 0 && (<p style={{ display: "block" }}> Fontes de 36W: {fonte36}</p>)}
                {fonte24 > 0 && (<p style={{ display: "block" }}> Fontes de 24W: {fonte24}</p>)}
                {fonte18 > 0 && (<p style={{ display: "block" }}> Fontes de 18W: {fonte18}</p>)}
            </div>

        </div>
    )
}

export default RelatorioFinal

