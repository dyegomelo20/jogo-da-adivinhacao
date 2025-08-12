// Seleção dos elementos do DOM
const btnStart = document.querySelector("#btn-start")
const btnInfor = document.querySelector("#btn-info")
const btnVoltaInfo = document.querySelector("#btn-menu")
const btnVerifica = document.querySelector("#btn-verifica")
const btnvoltaGame = document.querySelector("#btn-game-menu")
const menuContainer = document.querySelector(".menu-game")
const infoContainer = document.querySelector(".info-game")
const gameContainer = document.querySelector(".game")
const dicasContainer = document.querySelector(".dicas")
const inputValue = document.querySelector("#input-number")
const tentativasDom = document.querySelector("#tentativa")
const recordeContainer = document.querySelector("#recorde-game")

// Variáveis globais do jogo
let numeroGame // Número secreto gerado para o jogo
let tentativas // Tentativas restantes do jogador
let melhoResultado = 1 // Melhor resultado do jogador (menor número de tentativas)
let numerosDigitados = [] // Números já digitados pelo jogador
let statusGame = false // Status do jogo (ativo ou não)

// Função para gerar um número aleatório entre 1 e 100
const geraNumero = () => Math.floor(Math.random() * 100 + 1)

// Função principal para verificar o número digitado pelo usuário
const verificaNumber = (number) => {
    // Se acertou o número
    if (number === numeroGame) {
    // ...
        dicasContainer.innerHTML = ""
        gameGin()
        return
    }
    // Se o número é maior que o número secreto
    if (number > numeroGame) {
        dicaDoJogo(">", number)
        melhoResultado++
    }
    // Se o número é menor que o número secreto
    if (number < numeroGame) {
        dicaDoJogo("<", number)
        melhoResultado++
    }
    tentativas--

    verificaTentativa(tentativas)
    numerosDigitados.push(number)
}

// Exibe uma dica para o jogador após cada tentativa
const dicaDoJogo = (dica, number ) => {
    const p = document.createElement("p")
    p.innerText = `O seu número ${number} é ${dica} X `
    dicasContainer.insertBefore(p, dicasContainer.firstChild)
}

// Função chamada quando o jogador acerta o número
const gameGin = () => {
    const p = document.createElement("p")
    p.innerText = `🎉 Você acertou! O número era ${numeroGame}.`
    dicasContainer.insertBefore(p, dicasContainer.firstChild)
    btnVerifica.classList.add("oculta")
    btnvoltaGame.classList.remove("oculta")
    statusGame = false
    verificaRecordeAtual(melhoResultado)
}

// Atualiza o número de tentativas restantes e verifica se o jogo acabou
const verificaTentativa = (tentativas) => {
    let tentativasRestantes = tentativas
    tentativasDom.innerText = `Você tem ${tentativasRestantes} tentativas restantes`
    if (tentativasRestantes === 0){
        dicasContainer.innerHTML = ""
        dicasContainer.innerHTML = `<span>Você esgotou todas as tentativas. O número correto era ${numeroGame}. Tente novamente em outro jogo!</span>`;
        btnVerifica.classList.add("oculta")
        btnvoltaGame.classList.remove("oculta")
        statusGame = false
    }
}

// Verifica se o número já foi digitado anteriormente pelo jogador
const verificaNumerosDigitados = (number) => {
    const numeros = numerosDigitados
    // ...
    const p = document.createElement("p")
    p.innerHTML = `⚠️ Você já tentou o número ${number}. Tente outro!`

    if(numeros.includes(number)) {
        dicasContainer.insertBefore(p, dicasContainer.firstChild)
        return true
    }
}

// Exibe o recorde atual do usuário na tela
const recordeDoUsuario = () => {
    const recordeAtual = getRecorde()
    if(!recordeAtual) return
    recordeContainer.classList.add("aparece")
    recordeContainer.querySelector("h3").innerText = recordeAtual
    recordeContainer.querySelector("p").innerText = "Seu recorde atual"
    setTimeout(() => {
        recordeContainer.classList.remove("aparece")
    }, 5000)
}

// Verifica se o jogador bateu o recorde e atualiza se necessário
const verificaRecordeAtual = (recorde) => {
    const recordeAtual = getRecorde()
    // Se não há recorde salvo, ou o novo recorde é melhor
    if(!recordeAtual) {}
    else if (recordeAtual < recorde || recordeAtual === recorde) return

    setRecorde(recorde)
    recordeContainer.querySelector("h3").innerText =  `${recorde}° tentativa`
    recordeContainer.querySelector("p").innerText = "Parabéns, novo recorde! Acertou na"

    recordeContainer.classList.add("aparece")
    recordeContainer.classList.add("recorde-novo")
    setTimeout(() => {
        recordeContainer.classList.remove("recorde-novo")
        recordeContainer.classList.remove("aparece")
    }, 5000)
}




// Eventos dos botões e inputs
// Inicia o jogo quando o botão "Começar Jogo" é clicado
btnStart.addEventListener("click", () => {
    numeroGame = geraNumero()
    // ...
    menuContainer.classList.add("oculta")
    gameContainer.classList.remove("oculta")
    tentativas = 15
    recordeDoUsuario()
    melhoResultado = 1
    statusGame = true
})
// Mostra as informações do jogo
btnInfor.addEventListener("click", () => {
    menuContainer.classList.add("oculta")
    infoContainer.classList.remove("oculta")
})

// Volta ao menu principal a partir das informações
btnVoltaInfo.addEventListener("click", () => {
    menuContainer.classList.remove("oculta")
    infoContainer.classList.add("oculta")
})

// Verifica o número digitado quando o botão "Tentar" é clicado
btnVerifica.addEventListener("click", () => {
    const numberInput = +inputValue.value
    if(!numberInput) return
    if(verificaNumerosDigitados(numberInput)) return
    verificaNumber(numberInput)
})

// Volta ao menu principal após o fim do jogo
btnvoltaGame.addEventListener("click", () => {
    btnVerifica.classList.remove("oculta")
    btnvoltaGame.classList.add("oculta")
    menuContainer.classList.remove("oculta")
    gameContainer.classList.add("oculta")
    tentativasDom.innerText = ""
    inputValue.value = ""
    dicasContainer.innerHTML = ""
    numerosDigitados = []
})

// Valida o valor digitado no input para garantir que está entre 1 e 100
inputValue.addEventListener("input", (e) => {
    const valor = e.target.value
    const mensagem = document.querySelector(".mensagem")
    if(valor > 100 || valor < 0) {
    // ...
        mensagem.classList.add("aparece")
        setTimeout(() => {
            mensagem.classList.remove("aparece")
        }, 5000)
        e.target.value = 100
    } 
})


// Permite que o jogador pressione Enter para tentar o número
inputValue.addEventListener("keydown", (e) => {
    if (!statusGame) return
    if(e.key ==="Enter") {
        btnVerifica.dispatchEvent(new Event("click"))
    }
})


// Funções para manipular o recorde no localStorage
function getRecorde ()  {
    const recorde = JSON.parse(localStorage.getItem("recorde"))
    return recorde
}

function setRecorde  (save) {
    localStorage.setItem("recorde", JSON.stringify(save))
}