async function quizClickHandler(event) {
    event.preventDefault();

    let data = event.target.dataset.info;
    data = data.split(':');

    const id = data[0];

    document.location.replace(`/create/${id}`);
}

document.querySelector('.quiz-list').addEventListener('click', quizClickHandler);