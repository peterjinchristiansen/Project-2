var loggedAnswer = [];

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
    }
}

document.addEventListener('click', answerSelectHandler);