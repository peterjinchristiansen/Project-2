async function newQuizHandler(event) {
    event.preventDefault();
    // get the quiz title and category from the homepage
    const title = document.querySelector('input[name="quiz-title"]').value;
    const category = document.querySelector('select[name="quiz-category"]').value;

    if(title && category) {
        const response = await fetch(`/api/quizzes`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                category
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Please Input a Title and Select a Category for your Quiz!");
    }

}

document.querySelector('.outline-2b').addEventListener('submit', newQuizHandler);