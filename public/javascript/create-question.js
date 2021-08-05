let choiceId = 3;

function addChoiceHandler(event) {
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

    let choiceCheck = document.createElement("input");
    choiceCheck.type = "checkbox";
    choiceCheck.className = "checkbox";
    choiceCheck.id = `answer${choiceId}`;

    choiceLi.appendChild(choiceLabel);
    choiceLi.appendChild(choiceInput);
    choiceLi.appendChild(choiceCheck);

    choiceUl = document.getElementById('choice-list');
    choiceUl.appendChild(choiceLi);

    choiceId++;
}

function removeChoiceHandler(event) {
    event.preventDefault();

    choiceId--;

    const choiceLi = document.getElementById(`choice${choiceId}`);
    choiceLi.remove();
}

async function submitQuestionHandler(event) {
    event.preventDefault();

    const prompt = document.querySelector("input[name='prompt'").value;
    const choicesArr = [];
    let answer = [];
    for (i=1; i<choiceId; i++) {
        choicesArr.push(document.querySelector(`input[name='choice${i}']`).value);
        if(document.getElementById(`answer${i}`).checked) {
            answer.push(document.querySelector(`input[name='choice${i}']`).value)
        }
    }
    
    const quiz_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    

    const choices = choicesArr.toString();
    console.log(prompt);
    console.log(choices);
    console.log(answer);
    console.log(quiz_id);

    if(prompt && choices && answer && quiz_id && answer.length === 1) {
        answer = answer[0];
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
    } else {
        alert("Please ensure that all fields are filled and only one answer is selected before submitting!")
    }
}

async function deleteQuestionHandler(event) {
    event.preventDefault();

    const id = event.target.dataset.id;
    const prompt = document.getElementById(`question${id}`).innerText;

    let confirm = window.confirm(`Delete ${prompt}?`);
    
    if(confirm) {
        const response = await fetch(`/api/questions/${id}`,{
            method: "DELETE"
        });
        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.add-btn').addEventListener('click',addChoiceHandler);

document.querySelector('.remove-btn').addEventListener('click',removeChoiceHandler);

document.querySelector('.submit-btn').addEventListener('click',submitQuestionHandler);

document.querySelector('.quiz-list').addEventListener('click',deleteQuestionHandler);