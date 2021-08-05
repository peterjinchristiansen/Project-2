async function searchQuizzesHandler(event) {

    event.preventDefault();

    const title = document.querySelector('input[name="quiz-title"]').value;
    const category = document.querySelector('select[name="quiz-category"]').value;
    
    if(!title) {
        document.location.replace(`/search/${category}`);
    } else {
        document.location.replace(`/search/${category}/${title}`);
    }

}

async function quizSelectHandler(event) {
    event.preventDefault();
    const isButton = event.target.nodeName === 'BUTTON'
    if(!isButton){
        return;
    }
    window.data = event.target.dataset.info
    window.data = window.data.split(':');

    let quizInfo = document.querySelector('#quiz-info-wrapper');
    quizInfo.innerHTML = '';

    let quizTitle = document.createElement('h6');
    quizTitle.innerHTML = `Title: ${data[1]}`;
    let quizCreated = document.createElement('h6');
    quizCreated.innerHTML = `Created: ${data[2]}`;
    let quizNoQuest = document.createElement('h6');
    quizNoQuest.innerHTML = `No. of Questions: ${data[3]}`;

    quizInfo.appendChild(quizTitle);
    quizInfo.appendChild(quizNoQuest);
    quizInfo.appendChild(quizCreated);
}

async function startQuizHandler(event) {
    event.preventDefault();
    if (window.data != null) {
        var quizLocation = window.data[0];
        document.location.replace(`/take/${quizLocation}`);
    }
    console.log(window.data);
}

document.querySelector('.outline-3aa').addEventListener('submit', searchQuizzesHandler);

document.querySelector('.quiz-list').addEventListener('click', quizSelectHandler);

document.getElementById('btn-start-quiz').addEventListener('click', startQuizHandler);