
import './DadosDeEntrada.css'
import { useState } from 'react'
import Button from './Button.jsx'
import './responsividade.css'



const DadosEntrada = ({ entradaDados }) => {

    // Declaração dos estados locais para armazenar os valores dos campos do formulário
    const [potencia, settPotencia] = useState("")       
    const [rolo, settRolo] = useState("")              
    const [perfil, settPerfil] = useState("")           
    const [coeficiente, settCoeficiente] = useState("") 

    {/* Funções para manipular os dados digitados nos inputs */ }

    // Atualiza o estado potencia com o valor digitado
    const handlePotencia = (e) => settPotencia(e.target.value)

    // Atualiza o estado rolo com o valor digitado
    const handleRolo = (e) => settRolo(e.target.value)

    // Atualiza o estado perfil com o valor digitado
    const handlePerfil = (e) => settPerfil(e.target.value)

    // Atualiza o estado coeficiente com o valor digitado
    const handleCoeficiente = (e) => settCoeficiente(e.target.value)


    {/* Função para enviar os dados coletados ao componente pai */ }
    const savedDados = (e) => {
        e.preventDefault() // Evita o comportamento padrão do formulário (recarregar a página)

        // Chama a função recebida via props passando os valores dos estados
        entradaDados({ potencia, rolo, perfil, coeficiente })
    }

    // Estrutura JSX que renderiza o formulário e o botão
    return (
        <div className="container">
            <form className="form-geral" >
                {/* Campo de entrada para potência da fita */}
                <label className="divisao">
                    <span>Potencia da fita (W/metros): <span className="obrigatorio">*</span> </span>
                    <input
                        type="text"
                        name='potencia'
                        placeholder='12'
                        onChange={handlePotencia}
                        className="dados-iniciais"
                    />
                </label>

                {/* Campo de entrada para tamanho do rolo de fita */}
                <label className="divisao">
                    <span>Tamanho do rolo de fita (Metros): <span className="obrigatorio">*</span> </span>
                    <input
                        type="text"
                        name='roloDeFita'
                        placeholder='5'
                        onChange={handleRolo}
                        className="dados-iniciais"
                    />
                </label>

                {/* Campo de entrada para tamanho do perfil */}
                <label className="divisao">
                    <span>Tamanho do perfil (Metros): <span className="obrigatorio">*</span> </span>
                    <input
                        type="text"
                        name='perfil'
                        placeholder='3'
                        onChange={handlePerfil}
                        className="dados-iniciais"
                    />
                </label>

                {/* Campo de entrada para coeficiente de segurança */}
                <label className="divisao">
                    <span>Coeficiente de Segurança (%): <span className="obrigatorio">*</span> </span>
                    <input
                        type="text"
                        name='coeficiente'
                        placeholder='20'
                        onChange={handleCoeficiente}
                        className="dados-iniciais"
                    />
                </label>
            </form>

            {/* Botão que dispara a função savedDados ao ser clicado */}
            <Button
                id="save"
                text="Salvar Configurações"
                action={savedDados}
            />

        </div>
    )
}

// Exporta o componente para ser utilizado em outros arquivos
export default DadosEntrada
