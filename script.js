document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskText = document.getElementById('newTaskInput').value;
    if (taskText.trim() !== '') {
        const newTask = createTaskElement(taskText);
        document.getElementById('todo').querySelector('.tasks').appendChild(newTask);
        document.getElementById('newTaskInput').value = '';
    }
});

function createTaskElement(taskText) {
    const task = document.createElement('div');
    task.className = 'task';
    
    const leftButton = document.createElement('button');
    leftButton.className = 'left';
    leftButton.innerHTML = '←';
    leftButton.addEventListener('click', function() {
        moveTask(leftButton, 'left');
    });
    
    const taskContent = document.createElement('p');
    taskContent.textContent = taskText;
    
    const rightButton = document.createElement('button');
    rightButton.className = 'right';
    rightButton.innerHTML = '→';
    rightButton.addEventListener('click', function() {
        moveTask(rightButton, 'right');
    });
    
    task.appendChild(leftButton);
    task.appendChild(taskContent);
    task.appendChild(rightButton);
    
    updateButtonStates(task, 'todo');
    
    return task;
}

function moveTask(button, direction) {
    const task = button.parentElement;
    const fromCard = task.parentElement.parentElement.id;
    let toCard;
    
    if (direction === 'left') {
        if (fromCard === 'todo') toCard = 'backlog';
        else if (fromCard === 'ongoing') toCard = 'todo';
        else if (fromCard === 'done') toCard = 'ongoing';
    } else if (direction === 'right') {
        if (fromCard === 'backlog') toCard = 'todo';
        else if (fromCard === 'todo') toCard = 'ongoing';
        else if (fromCard === 'ongoing') toCard = 'done';
    }
    
    if (toCard) {
        document.getElementById(toCard).querySelector('.tasks').appendChild(task);
        updateButtonStates(task, toCard);
    }
}

function updateButtonStates(task, cardId) {
    const leftButton = task.querySelector('.left');
    const rightButton = task.querySelector('.right');
    
    switch(cardId) {
        case 'backlog':
            leftButton.disabled = true;
            rightButton.disabled = false;
            break;
        case 'todo':
            leftButton.disabled = false;
            rightButton.disabled = false;
            break;
        case 'ongoing':
            leftButton.disabled = false;
            rightButton.disabled = false;
            break;
        case 'done':
            leftButton.disabled = false;
            rightButton.disabled = true;
            break;
    }
}

// Initialize button states on page load
window.onload = function() {
    document.querySelectorAll('.card').forEach(card => {
        card.querySelectorAll('.task').forEach(task => {
            updateButtonStates(task, card.id);
        });
    });
};
