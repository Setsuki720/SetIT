const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

function renderTasks() {
    taskList.innerHTML = '';
    let keys = Object.keys(localStorage)
        .filter(key => key.startsWith('task-'))
        .sort();

    keys.forEach(key => {
        const taskData = JSON.parse(localStorage.getItem(key));
        createTaskElement(key, taskData);
    });
}

function createTaskElement(key, taskData) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (taskData.completed) {
        li.classList.add('is-completed');
    }

    li.innerHTML = `
        <span class="task-text">${taskData.text}</span>
        <div class="btn-group">
            <button class="done-btn" onclick="toggleTask('${key}')">Дело сделано</button>
            <button class="delete-btn" onclick="deleteTask('${key}')">Удалить</button>
        </div>
    `;
    taskList.appendChild(li);
}

function addTask() {
    const text = taskInput.value.trim();
    if (text !== "") {
        const id = Date.now();
        const key = `task-${id}`;
        
        const taskObject = {
            text: text,
            completed: false 
        };

        localStorage.setItem(key, JSON.stringify(taskObject));
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(key) {
    const taskData = JSON.parse(localStorage.getItem(key));
    taskData.completed = !taskData.completed;
    localStorage.setItem(key, JSON.stringify(taskData));
    renderTasks(); 
}

function deleteTask(key) {
    localStorage.removeItem(key);
    renderTasks();
}

function clearAll() {
    if (confirm("Очистить список квестов?")) {
        Object.keys(localStorage)
            .filter(key => key.startsWith('task-'))
            .forEach(key => localStorage.removeItem(key));
        renderTasks();
    }
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearBtn.addEventListener('click', clearAll);

renderTasks();