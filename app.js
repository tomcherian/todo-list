//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', fiterTodos);

//Functions

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  //Todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //Create Li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //Add todo to localstorage
  saveLocalTodos(todoInput.value);
  // Check mark button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class= "fas fa-check"></i>';
  completeButton.classList.add('complete-button');
  todoDiv.appendChild(completeButton);
  // Check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
  trashButton.classList.add('trash-button');
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
  //Clear the todo input
  todoInput.value = '';
}

function deleteCheck(event) {
  const item = event.target;
  //Delete todo
  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocalTodos(todo)
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
  //Check todo
  if (item.classList[0] === 'complete-button') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function fiterTodos(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    console.log(todo);
    switch (event.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check whether any todos there?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  //Check whether any todos there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class= "fas fa-check"></i>';
    completeButton.classList.add('complete-button');
    todoDiv.appendChild(completeButton);
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
    let todos;
    //Check whether any todos there?
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].textContent
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
