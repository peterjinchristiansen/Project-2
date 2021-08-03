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
    let data = event.target.dataset.info
    data = data.split(':');

    let quizInfo = document.querySelector('#quiz-info-wrapper');
    quizInfo.innerHTML = '';

    let quizTitle = document.createElement('h6');
    quizTitle.innerHTML = `Title: ${data[0]}`;
    let quizCreated = document.createElement('h6');
    quizCreated.innerHTML = `Created: ${data[1]}`;
    let quizNoQuest = document.createElement('h6');
    quizNoQuest.innerHTML = `No. of Questions: ${data[2]}`;

    quizInfo.appendChild(quizTitle);
    quizInfo.appendChild(quizNoQuest);
    quizInfo.appendChild(quizCreated);
}

document.querySelector('.outline-3aa').addEventListener('submit', searchQuizzesHandler);

document.querySelector('.quiz-list').addEventListener('click', quizSelectHandler);