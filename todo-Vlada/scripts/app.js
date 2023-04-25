let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')


function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add('todo');
    const isDone = todos[index].done ? 'checked' : '';
    element.innerHTML = `
    <div class="todo__day">Дело ${Number(index) + 1}</div>
    <input class="todo__comment" type="text" value="${todos[index].text}" class="todo__text" id="todo-${index}" oninput="updateTodoText(event.target.value, ${index})" disabled />
    <input class="todo__check" type="checkbox" onclick="toggleDone(${index})" ${isDone} />
    <button class="todo__delete" onclick="deleteTodo(${index})">
      <img src="./images/delete.svg" alt="Удалить дело ${index + 1}" />
    </button>
    <button class="todo__edit" onclick="enableTodoEdit(${index})">
      <img src="./images/edit.webp" width="15" height="15" alt="Отредактировать дело ${index + 1}" />
    </button>`;
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}

function addTodo(event) {
  event.preventDefault();
  
  const data = event.target['comment'].value
  if (!data) {
    return;
  }
  
  const newTodo = {
    text: data,
    done: false
  };
  todos.push(newTodo);
  event.target['comment'].value = '';
  
  rerender();
  saveData();
}


function updateTodoText(text, index) {
  todos[index].text = text;
}

function enableTodoEdit(index) {
  const todoText = document.getElementById(`todo-${index}`);
  todoText.disabled = false;
  todoText.focus();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

function editTodo(index) {
  const inputElement = document.getElementById(`todo-${index}`);
  const todoText = inputElement.value;
  todos[index].text = todoText;
  inputElement.disabled = true;
  saveData();
}

function toggleDone(index) {
  const check=document.querySelectorAll(".todo__check")
  const texts=document.querySelectorAll(".todo__comment")
  if (check[index].checked) {
    texts[index].style.textDecoration = "line-through";
  }
  else {
    texts[index].style.textDecoration = "none";
  }

}

/* init */
(() => {
  loadData();
  rerender();
})();