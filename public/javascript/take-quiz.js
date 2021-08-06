var loggedAnswer = [];
const lastIdEl = document.getElementById('quiz-title').dataset.last;
const idData = lastIdEl.split(':');
const lastId = idData[1];
const quizId = idData[0];

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
        } else {
            document.getElementById(data[0]).textContent = 'Incorrect!';
            document.getElementById(data[0]).style.color = 'red';
        }
        loggedAnswer.push(currentQuestion);
        if(data[0] === lastId) {
            document.location.replace(`/end/${quizId}`);
        }
    }
}

document.querySelector('.question-list').addEventListener('click', answerSelectHandler);