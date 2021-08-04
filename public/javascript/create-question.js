let choiceId = 3;

async function addChoiceHandler(event) {
    event.preventDefault();

    let choiceLi = document.createElement("li");
    choiceLi.id = `choice${choiceId}`;
    choiceLi.setAttribute('class','mt-3');

    let choiceLabel = document.createElement("label");
    choiceLabel.for = `choice${choiceId}`;
    choiceLabel.innerHTML = "Enter a Choice";

    let choiceInput = document.createElement("input");
    choiceInput.text = "text";
    choiceInput.name = `choice${choiceId}`;
    choiceInput.placeholder = "Choice";

    choiceLi.appendChild(choiceLabel);
    choiceLi.appendChild(choiceInput);

    choiceUl = document.getElementById('choice-list');
    choiceUl.appendChild(choiceLi);

    choiceId++;
}

async function removeChoiceHandler(event) {
    event.preventDefault();

    choiceId--;

    const choiceLi = document.getElementById(`choice${choiceId}`);
    choiceLi.remove();
}

async function submitQuestionHandler(event) {
    event.preventDefault();

    const prompt = document.querySelector("input[name='prompt'").value;
    const choicesArr = [];
    for (i=1; i<choiceId; i++) {
        choicesArr.push(document.querySelector(`input[name='choice${i}']`).value);
    }
    
    const answer = document.querySelector("input[name='answer'").value;
    const quiz_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    
    const choices = choicesArr.toString();
    console.log(prompt);
    console.log(choices);
    console.log(answer);
    console.log(quiz_id);

    if(prompt && choices && answer && quiz_id) {
        const response = await fetch('/api/questions', {
            method: 'POST',
            body: JSON.stringify({
                prompt,
                choices,
                answer,
                quiz_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.add-btn').addEventListener('click',addChoiceHandler);

document.querySelector('.remove-btn').addEventListener('click',removeChoiceHandler);

document.querySelector('.submit-btn').addEventListener('click',submitQuestionHandler);