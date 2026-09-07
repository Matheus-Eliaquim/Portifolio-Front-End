// Importa hooks do React e componentes externos
import { useState, useEffect } from 'react'
import Button from './Button.jsx' // Componente de botão personalizado
import './InputMetros.css' // Estilos específicos para este componente
import './responsividade.css' // Estilos de responsividade
import RelatorioFinal from './RelatorioFinal.jsx'

// Componente principal que recebe propriedades de configuração
const InputMetros = ({ potencia, rolo, perfil, coeficiente, receberRelatorio }) => {
    // Estados internos do componente
    const [valor, setValor] = useState("") // Valor digitado pelo usuário (metragem)
    const [totalMetros, setTotalMetros] = useState(0)
    const [distancia, setDistancia] = useState("5") // Espaçamento entre fontes (default 5m)
    const [fonteQTD, setFonteQTD] = useState(0) // Quantidade de fontes calculadas
    const [fontePotencia, setFontePotencia] = useState(0) // Potência de cada fonte calculada
    const [linhasTabela, setLinhasTabela] = useState([]) // Lista de linhas que serão exibidas na tabela
    const [fonte200, setFonte200] = useState(false); // estado para saber se a opção apenas fontes de 200w está ativa
    const [erro, setErro] = useState("") // estado utilizado para validar se há algum numero errado e retornar mensagem para usuario
    const [abrirRelatorio, setAbrirRelatorio] = useState(false)

    const [fontes, setFontes] = useState({
        fonte18W: 0,
        fonte24W: 0,
        fonte36W: 0,
        fonte48W: 0,
        fonte60W: 0,
        fonte72W: 0,
        fonte100W: 0,
        fonte150W: 0,
        fonte200W: 0,
    })

    //função utilizada para contar quantas fontes de cada potencia serão utilizadas
    function contarFontes(fontePotencia) {
        if (fontePotencia <= 18) {
            setFontes(prev => ({
                ...prev,
                fonte18W: prev.fonte18W + fonteQTD
            }))
        } else if (fontePotencia > 18 && fontePotencia <= 24) {
            setFontes(prev => ({
                ...prev,
                fonte24W: prev.fonte24W + fonteQTD
            }))
        } else if (fontePotencia > 24 && fontePotencia <= 36) {
             setFontes(prev => ({
                ...prev,
                fonte36W: prev.fonte36W + fonteQTD
            }))
        } else if (fontePotencia > 36 && fontePotencia <= 48) {
             setFontes(prev => ({
                ...prev,
                fonte48W: prev.fonte48W + fonteQTD
            }))
        } else if (fontePotencia > 48 && fontePotencia <= 60) {
             setFontes(prev => ({
                ...prev,
                fonte60W: prev.fonte60W + fonteQTD
            }))
        } else if (fontePotencia > 60 && fontePotencia <= 72) {
             setFontes(prev => ({
                ...prev,
                fonte72W: prev.fonte72W + fonteQTD
            }))
        } else if (fontePotencia > 72 && fontePotencia <= 100) {
             setFontes(prev => ({
                ...prev,
                fonte100W: prev.fonte100W + fonteQTD
            }))
        } else if (fontePotencia > 100 && fontePotencia <= 150) {
             setFontes(prev => ({
                ...prev,
                fonte150W: prev.fonte150W + fonteQTD
            }))
        } else if (fontePotencia > 150 && fontePotencia <= 200) {
             setFontes(prev => ({
                ...prev,
                fonte200W: prev.fonte200W + fonteQTD
            }))
        }
    }

    //função utilizada para arredondar a potencia de uma fonte para os padrões de uso do usuario
    function arredondarPotencia(fontePotencia) {
        if (fontePotencia <= 18) {
            setFontePotencia(18)
        } else if (fontePotencia > 18 && fontePotencia <= 24) {
            setFontePotencia(24)
        } else if (fontePotencia > 24 && fontePotencia <= 36) {
            setFontePotencia(36)
        } else if (fontePotencia > 36 && fontePotencia <= 48) {
            setFontePotencia(48)
        } else if (fontePotencia > 48 && fontePotencia <= 60) {
            setFontePotencia(60)
        } else if (fontePotencia > 60 && fontePotencia <= 72) {
            setFontePotencia(72)
        } else if (fontePotencia > 72 && fontePotencia <= 100) {
            setFontePotencia(100)
        } else if (fontePotencia > 100 && fontePotencia <= 150) {
            setFontePotencia(150)
        } else if (fontePotencia > 150 && fontePotencia <= 200) {
            setFontePotencia(200)
        }
    }

    const perf = Number(perfil); // Converte perfil recebido via props para número

    // useEffect: calcula quantidade de fontes sempre que "valor" ou "distancia" mudam
    useEffect(() => {
        //caso a opção fontes de 200W esteja ativa, utiliza a potencia da fonte para calcular quantas fontes serão usadas
        if (fontePotencia === '200') {
            setFonteQTD(Math.ceil((valor * potencia) / fontePotencia))
            return
        }
        if (valor && distancia) {
            // Divide o valor pela distância e arredonda para cima
            setFonteQTD(Math.ceil(valor / distancia))
        }
    }, [valor, distancia])

    // useEffect: calcula a potência da fonte sempre que dependências mudam
    useEffect(() => {

        if (fonte200) return

        if (valor && fonteQTD && potencia && coeficiente) {
            // Calcula potência parcial
            const watsParcial = (Number(valor) * potencia) / fonteQTD
            // Aplica coeficiente de segurança
            const coeficienteReal = coeficiente / 100 + 1
            const watsReal = watsParcial * coeficienteReal
            // Atualiza estado com potência arredondada
            setFontePotencia(watsReal.toFixed(0))
            arredondarPotencia(watsReal)
        }

    }, [valor, fonteQTD, potencia, coeficiente])

    // Função chamada ao apertar Enter no input
    const handleKeydown = (e) => {
        if (e.key === 'Enter' && valor) {
            const va = Number(valor) // Converte valor digitado para número
            const inteiras = Math.floor(va / perf) // Quantidade de barras inteiras
            const resto = va % perf // Sobra da divisão

            // Adiciona nova linha na tabela com os cálculos
            setLinhasTabela((prev) => [
                ...prev,
                {
                    valor: va,
                    perf: perf,
                    barrasInteiras: inteiras,
                    resto: resto,
                    qtdFonte: fonteQTD,
                    potenciaFonte: fontePotencia,
                },
            ])
            setTotalMetros((prev) => prev + va)
            contarFontes(fontePotencia)
            setValor('')
        }
    }

    //função utilizada para verificar se "," está sendo utilizado como separador decimal
    const handleChange = (e) => {
        const input = e.target.value

        //verifica se ha virgula 
        if (input.includes(',')) {
            setErro('Valor invalido!')
            return
        }

        //verifica se o numero é valido
        if (input && isNaN(Number(input))) {
            setErro('Valor invalido!')
            return
        }

        setErro('')
        setValor(input)
    } // fecha o handle change

    // Função para atualizar o espaçamento entre fontes (quando usuário seleciona rádio)
    const handleDist = (e) => {
        setDistancia(e.target.value)
    }


    // JSX que define a interface do componente
    return (
        <div className="dados-de-input">
            {/* Cabeçalho com informações recebidas via props */}
            <header id="dados-para-calculo">
                <h3>Potencia da fita: {potencia}W/m</h3>
                <h3>Rolo de fita: {rolo}m</h3>
                <h3>Barra de perfil: {perfil}m</h3>
                <h3>Coeficiente de segurança: {coeficiente}%</h3>
            </header>

            {/* Área de entrada de dados */}
            <div id="metragem-individual">
                <div id="inputs">
                    {/* Campo de texto para digitar metragem */}
                    <input
                        type="text"
                        id="entradaValor"
                        name="metragem"
                        placeholder="digite o tamanho em metros. EX: 12.00"
                        value={valor}
                        onChange={handleChange} // Atualiza estado ao digitar
                        onKeyDown={handleKeydown} // Adiciona linha ao apertar Enter
                    />
                    <div id='erro'>
                        {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    </div>

                    <h4>Espaçamento por Fonte</h4>
                    <div id="radios">
                        {/* Opções de espaçamento entre fontes */}
                        <label className="radio-inputs">
                            <input
                                type="radio"
                                value="5"
                                name="fonts"
                                checked={!fonte200 && distancia === '5'}
                                onChange={(e) => {
                                    setDistancia(e.target.value)
                                    setFonte200(false)
                                }}
                            />
                            5m
                        </label>
                        <label className="radio-inputs">
                            <input
                                type="radio"
                                value="7"
                                name="fonts"
                                checked={!fonte200 && distancia === '7'}
                                onChange={(e) => {
                                    setDistancia(e.target.value)
                                    setFonte200(false)
                                }}
                            />
                            7m
                        </label>
                        <label className="radio-inputs">
                            <input
                                type="radio"
                                value="200"
                                name="fonts"
                                checked={fonte200}
                                onChange={() => {
                                    setFonte200(true)
                                    setFontePotencia('200')
                                }}
                            />
                            Fonte de 200W
                        </label>
                    </div>
                    {/* Tabela que exibe as linhas adicionadas */}
                    <div className="container">
                        <table id="tabela-entradas">
                            <thead>
                                <tr>
                                    <th>Entradas</th>
                                    <th>Barras de {perf.toFixed(2)}m</th>
                                    <th>Sobras</th>
                                    <th>Fontes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {linhasTabela.map((linha, index) => (
                                    <tr key={index}>
                                        <td>{Number(linha.valor).toFixed(2)}m</td>
                                        <td>{linha.barrasInteiras}x{Number(linha.perf).toFixed(2)}m</td>
                                        <td>{Number(linha.resto).toFixed(2)}m</td>
                                        <td>{linha.qtdFonte}x{linha.potenciaFonte}W</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div id='button-div'>
                            {/* Botão de cálculo (não faz nada além de prevenir reload) */}
                            <Button id="iniciar-calculo" text="Calcular" action={(e) => {
                                e.preventDefault()
                                receberRelatorio({
                                    totalMetros,
                                    fontes,
                                    abrirRelatorio: true
                                })
                            }}
                            />
                        </div>
                        {/*fecha button-div */}
                    </div>
                    {/* fecha container */}
                </div>
                {/* fecha inputs */}
            </div>
            {/* fecha metragem individual */}
        </div>
    )
}

// Exporta o componente para ser usado em outros arquivos
export default InputMetros
