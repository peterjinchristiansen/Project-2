var pathArray = window.location.pathname.split('/');
var quizId = pathArray[pathArray.length - 1];
/*
const questionData = startQuiz(quizId);

async function startQuiz (quizId) {
    const questionData = await fetch(`/api/questions/` + quizId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    return questionData;
}
*/

async function answerSelectHandler (event) {
    event.preventDefault();

    const isButton = event.target.nodeName === 'BUTTON'
    if(!isButton){
        return;
    }
    let data = event.target.dataset.info;
    data = data.split(':');
    
    if (data[1] == data[2]) {
        document.getElementById(data[0]).innerHTML = "Correct!";
    } else {
        document.getElementById(data[0]).innerHTML = "Incorrect!";
    }
    
}

document.addEventListener('click', answerSelectHandler);

startQuiz(quizId);