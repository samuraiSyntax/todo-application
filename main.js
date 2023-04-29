// VARIABLES
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todosEl = document.getElementById("todos-el");

let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const today = new Date();

// FUNCTIONS
const addNewTodo = () => {
  let newTodo = {
    todoText: todoInput.value.trim(),
    timeStamp: `${WEEKDAYS[today.getDay()]} ${today.getDate()} ${
      MONTHS[today.getMonth()]
    } ${today.getFullYear()}, ${today.getHours()} ${today.getMinutes()}`,
  };

  if (newTodo) {
    todos.push(newTodo);
    todos.sort((a, b) => {
      return new Date(b.timeStamp) - new Date(a.timeStamp);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
};

const renderTodos = () => {
  todosEl.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoEl = document.createElement("li");
    const div = document.createElement("div");
    div.setAttribute("class", "list-div");

    const span = document.createElement("span");
    span.setAttribute("class", "list-span");
    span.innerText = todo.todoText;

    const small = document.createElement("small");
    small.innerText = todo.timeStamp;

    div.appendChild(span);
    div.appendChild(small);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="bi bi-trash-fill"></i>`;
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    todoEl.appendChild(div);
    todoEl.appendChild(deleteBtn);

    todosEl.appendChild(todoEl);
  });
};

// EVENTS AND LISTENERS
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!todoInput || todoInput.value === "") {
    alert("Please enter a todo!");
  } else {
    addNewTodo();
    renderTodos();
  }

  todoInput.value = "";
});

renderTodos();
