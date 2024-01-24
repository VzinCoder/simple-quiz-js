const card1 = {
    pergunta: "O que é JavaScript?",
    opcoes: ["Uma linguagem de programação", "Um sistema operacional", "Um navegador web", "Um banco de dados"],
    respostaCorreta: 0,
};


const card2 = {
    pergunta: "Qual palavra-chave é usada para declarar uma constante em JavaScript?",
    opcoes: ["var", "let", "const", "variable"],
    respostaCorreta: 2,
};


const card3 = {
    pergunta: "Como você escreve um comentário de uma linha em JavaScript?",
    opcoes: ["// Isso é um comentário", "/* Isso é um comentário */", "# Isso é um comentário", "-- Isso é um comentário"],
    respostaCorreta: 0,
};


const card4 = {
    pergunta: "Qual método é usado para imprimir algo no console em JavaScript?",
    opcoes: ["console.log()", "print()", "log.console()", "write.console()"],
    respostaCorreta: 0,
};


const card5 = {
    pergunta: "O que é JSON?",
    opcoes: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Oriented Notation", "JSON Object Notation"],
    respostaCorreta: 0,
};


const card6 = {
    pergunta: "Quando a instrução 'return' é usada em uma função?",
    opcoes: ["Para iniciar a função", "Para encerrar a função", "Para declarar uma variável", "Para imprimir no console"],
    respostaCorreta: 1,
};


const card7 = {
    pergunta: "O que é um closure em JavaScript?",
    opcoes: ["Um tipo de loop", "Uma função dentro de outra função", "Um método de ordenação", "Um tipo de variável"],
    respostaCorreta: 1,
};


const card8 = {
    pergunta: "Qual é a finalidade do método 'addEventListener' em JavaScript?",
    opcoes: ["Criar uma variável", "Adicionar um evento a um elemento", "Iniciar uma animação", "Importar uma biblioteca"],
    respostaCorreta: 1,
};


const card9 = {
    pergunta: "O que é o DOM em JavaScript?",
    opcoes: ["Data Object Model", "Document Object Model", "Design Object Model", "Dynamic Object Model"],
    respostaCorreta: 1,
};


const card10 = {
    pergunta: "Quais são os operadores lógicos em JavaScript?",
    opcoes: ["AND, OR, NOT", "&&, ||, !", "AND, OR, XOR", "++ --"],
    respostaCorreta: 1,
};



const arrCards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]

const main = document.querySelector('main')
const cardBody = document.querySelector('.card-body')
const restartButton = document.createElement('button')

let points = 0
let arrTemplate = []

const generateButtonsCard = options => {
    let buttons = ''
    options.forEach(opcao => buttons += `<button class="btn btn-outline-primary" >${opcao}</button>`)
    return buttons
}

const generateTemplate = ({ pergunta, opcoes }) => {
    const template = `<h5 class="card-title fs-2">${pergunta}</h5> <div class='container-btn'>${generateButtonsCard(opcoes)}</div>`
    return template
}


arrCards.forEach(card => arrTemplate.push(generateTemplate(card)))


const checkAnswer = (question, response) => {
    const { opcoes, respostaCorreta } = arrCards.find(({ pergunta }) => pergunta === question)
    const isRight = opcoes[respostaCorreta] === response
    if (isRight) {
        points++
    }
}


const insertRandomAnswer = () => {
    if (arrTemplate.length > 0) {
        const randomNumber = Math.floor(Math.random() * arrTemplate.length)
        const cardTemplate = arrTemplate[randomNumber]
        cardBody.innerHTML = cardTemplate
        arrTemplate = arrTemplate.filter(card => card != cardTemplate)
        return true
    }
    return false
}

const insertResultQuiz = () => {
    cardBody.innerHTML = `<h5 class="card-title fs-2">Your score is ${points}/10</h5>`
    restartButton.textContent = 'Restart'
    restartButton.setAttribute('class', 'btn btn-outline-primary')
    cardBody.append(restartButton)
}

const restartQuiz = event => {
    event.stopPropagation()
    location.reload()
}

const getQuestionAndResponse = (element) => {
    const question = document.querySelector('h5').textContent
    const response = element.textContent
    return { question, response }
}

const handleClick = ({ target }) => {
    const elementClicked = target
    const isButton = elementClicked.tagName === 'BUTTON'
    const isDiferrentStartAndRestart = elementClicked.id != 'start' && elementClicked.id != 'restart'

    if (isButton) {

        if (isDiferrentStartAndRestart) {
            const { question, response } = getQuestionAndResponse(elementClicked)
            checkAnswer(question, response)
        }

        if (!insertRandomAnswer()) {
            insertResultQuiz()
        }

    }
}


main.addEventListener('click', handleClick)
restartButton.addEventListener('click', restartQuiz)
