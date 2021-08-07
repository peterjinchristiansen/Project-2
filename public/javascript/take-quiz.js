const loggedAnswer = [];
const quizLength = document.querySelector('.question-list').childElementCount;
const quizId = parseInt(document.getElementById('quiz-title').dataset.quiz);
console.log(quizId);
let score = 0;

async function answerSelectHandler(event) {
    event.preventDefault();

    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton) {
        return;
    }
    let data = event.target.dataset.info;
    data = data.split(':');

    currentQuestion = data[0]
        
    if (!loggedAnswer.includes(currentQuestion)) {
        if (data[1] == data[2]) {
            document.getElementById(data[0]).textContent = 'Correct!';
            document.getElementById(data[0]).style.color = 'green';
            score++;
        } else {
            document.getElementById(data[0]).textContent = 'Incorrect!';
            document.getElementById(data[0]).style.color = 'red';
        }
        loggedAnswer.push(currentQuestion);
        if(loggedAnswer.length === quizLength) {
            document.location.replace(`/end/${score}/${quizLength}/${quizId}`);
        }
    }
}

document.querySelector('.question-list').addEventListener('click', answerSelectHandler);