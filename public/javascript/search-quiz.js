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

document.querySelector('.outline-3aa').addEventListener('submit', searchQuizzesHandler);