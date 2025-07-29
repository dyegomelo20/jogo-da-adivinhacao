// seleção de elementos 
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
const recordeConatiner = document.querySelector("#recorde-game")

//Variavel 
let numeroGame

let tentativas

let melhoResultado = 1

let numerosDigitados = []

//funções 
const geraNumero = () => Math.floor(Math.random() * 100 + 1)

const verificaNumber = (number) => {
    if (number === numeroGame) {
        console.log("acertou")
        dicasContainer.innerHTML = ""
        gameGin(number)
        return
    }
    if (number > numeroGame) {
        dicaDoJogo(">", number)
        melhoResultado++
    }
    if (number < numeroGame) {
        dicaDoJogo("<", number)
        melhoResultado++
    }
    tentativas--
    verificaTentativa(tentativas)
    console.log(melhoResultado)
}

const dicaDoJogo = (dica, number ) => {
    const p = document.createElement("p")
    p.innerText = `O seu numero ${number} é ${dica} X `
    dicasContainer.insertBefore(p, dicasContainer.firstChild)
    
}

const gameGin = () => {
    const p = document.createElement("p")
    p.innerText = `🎉 Você acertou! O número era ${numeroGame}.`
    dicasContainer.insertBefore(p, dicasContainer.firstChild)
    btnVerifica.classList.add("oculta")
    btnvoltaGame.classList.remove("oculta")
    verificaRecordeAtual(melhoResultado)
}

const verificaTentativa = (tentativas) => {
    tentativasRestantes = tentativas
    tentativasDom.innerText = `Você tem ${tentativasRestantes} tentativas Restantes`
    if (tentativasRestantes === 0){
        dicasContainer.innerHTML = ""
        dicasContainer.innerHTML = `<span>Você esgotou todas as tentativas. O número correto era ${numeroGame}. Tente novamente em outro jogo!</span>`;
        btnVerifica.classList.add("oculta")
    btnvoltaGame.classList.remove("oculta")
    }

}

const verificaNumerosDigitados = (number) => {
    const numeros = numerosDigitados
    console.log("ok")
    const p = document.createElement("p")
    p.innerHTML = `⚠️ Você já tentou o número ${number}. Tente outro!`

    if(numeros.includes(number)) {
        dicasContainer.insertBefore(p, dicasContainer.firstChild)
        return true
    }

    
}

const recordeDoUsuario = () => {
    const recordeAtual = getRecorde()
    if(!recordeAtual) return
    recordeConatiner.classList.add("aparece")
    recordeConatiner.querySelector("h3").innerText = recordeAtual
    recordeConatiner.querySelector("p").innerText = "Seu recorde atual"
    setTimeout(() => {
        recordeConatiner.classList.remove("aparece")
    }, 5000)
}

const verificaRecordeAtual = (recorde) => {
    const recordeAtual = getRecorde()
    
    if(!recordeAtual) {}
    else if (recordeAtual < recorde || recordeAtual === recorde) return


        setRecode(recorde)
        recordeConatiner.querySelector("h3").innerText =  `${recorde}° tentativa`
        recordeConatiner.querySelector("p").innerText = "Parabens novo recorde. acertou na"

        recordeConatiner.classList.add("aparece")
        recordeConatiner.classList.add("recorde-novo")
        setTimeout(() => {
        recordeConatiner.classList.remove("recorde-novo")
        recordeConatiner.classList.remove("aparece")
    }, 5000)
}




//Eventos
btnStart.addEventListener("click", () => {
    numeroGame = geraNumero()
    console.log(numeroGame)
    menuContainer.classList.add("oculta")
    gameContainer.classList.remove("oculta")
    tentativas = 15
    recordeDoUsuario()
    melhoResultado = 1

})
btnInfor.addEventListener("click", () => {
    menuContainer.classList.add("oculta")
    infoContainer.classList.remove("oculta")
})

btnVoltaInfo.addEventListener("click", () => {
    menuContainer.classList.remove("oculta")
    infoContainer.classList.add("oculta")
})

btnVerifica.addEventListener("click", () => {
    const numberInput = +inputValue.value
    if(!numberInput) return
    if(verificaNumerosDigitados(numberInput)) return
    verificaNumber(numberInput)
})

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

inputValue.addEventListener("input", (e) => {
    const valor = e.target.value
    const mensagem = document.querySelector(".mensagem")
    if(valor > 100 || valor < 0) {
        console.log("teste")
        mensagem.classList.add("aparece")
        setTimeout(() => {
            mensagem.classList.remove("aparece")
        }, 5000)
        e.target.value = 100
    } 
})


// inputValue.addEventListener("keydown", (e) => {
//     if(e.key ==="Enter") {
//         btnVerifica.dispatchEvent(new Event("click"))
//     }
// })


//  localstorage

function getRecorde ()  {
    const recorde = JSON.parse(localStorage.getItem("recorde"))
    return recorde
}


function setRecode  (save) {
    const recorde = getRecorde()
    localStorage.setItem("recorde", JSON.stringify(save))
}