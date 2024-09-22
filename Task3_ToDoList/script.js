const addButton = document.querySelector(".add-btn");
const inputField = document.querySelector(".input-field");
const tasksContainer = document.querySelector(".tasks");

document.addEventListener("DOMContentLoaded", loadTasks);


addButton.addEventListener("click", (e) => {
  e.preventDefault();

  const taskText = inputField.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskHTML = `
    <div class="task">
      <input type="checkbox" class="custom-checkbox">
      <p class="task-para">${taskText}</p>
      <button class="delete-btn"><img src="delete.svg" alt="delete"></button>
    </div>
  `;

  tasksContainer.innerHTML += taskHTML;
  inputField.value = "";
  
  saveTasks();
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("custom-checkbox")) {
    const task = e.target.closest(".task");
    const taskPara = task.querySelector("p");
    taskPara.classList.toggle("checked");
    saveTasks();
  }

  if (e.target.closest(".delete-btn")) {
    const task = e.target.closest(".task");
    task.remove();
    saveTasks();
  }
});

function saveTasks() {
  const tasks = [];
  const taskElements = tasksContainer.querySelectorAll(".task");

  taskElements.forEach(task => {
    const taskText = task.querySelector(".task-para").textContent;
    const isChecked = task.querySelector(".custom-checkbox").checked;
    tasks.push({ text: taskText, completed: isChecked });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      const taskHTML = `
        <div class="task">
          <input type="checkbox" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
          <p class="task-para ${task.completed ? 'checked' : ''}">${task.text}</p>
          <button class="delete-btn"><img src="delete.svg" alt="delete"></button>
        </div>
      `;
      tasksContainer.innerHTML += taskHTML;
    });
  }
}
