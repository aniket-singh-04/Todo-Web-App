const input = document.querySelector('.todo-input');
const ul = document.querySelector('.task-ul');


window.addEventListener("DOMContentLoaded", () => { // page load hoga tab ye run ho jaiga 
    const tasks = JSON.parse(localStorage.getItem("myTodoTasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
});


function addTaskToDOM(text, completed = false) {
    const li = document.createElement("li");
    li.classList.add("task-li");
    if (completed) li.classList.add("completed");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-input");
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    leftDiv.append(checkbox, span);
    li.append(leftDiv, deleteBtn);
    ul.appendChild(li);

    leftDiv.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
        li.classList.toggle("completed");
        updateTaskInLocalStorage(text, checkbox.checked);
    });

    checkbox.addEventListener("click", (e) => {
        e.stopPropagation();
        li.classList.toggle("completed");
        updateTaskInLocalStorage(text, checkbox.checked);
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        removeTaskFromLocalStorage(text);
    });
}

function todoAdd() {
    const inputText = input.value.trim();
    if (!inputText) {
        alert("Please enter a task");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("myTodoTasks")) || [];
    tasks.push({ text: inputText, completed: false });
    localStorage.setItem("myTodoTasks", JSON.stringify(tasks));

    addTaskToDOM(inputText);
    input.value = "";
}

function updateTaskInLocalStorage(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("myTodoTasks")) || [];
    const index = tasks.findIndex(t => t.text === text);
    if (index !== -1) {
        tasks[index].completed = completed;
        localStorage.setItem("myTodoTasks", JSON.stringify(tasks));
    }
}

function removeTaskFromLocalStorage(text) {
    let tasks = JSON.parse(localStorage.getItem("myTodoTasks")) || [];
    tasks = tasks.filter(t => t.text !== text);
    localStorage.setItem("myTodoTasks", JSON.stringify(tasks));
}
