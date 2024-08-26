let globalTodoId = 1;
let todos = [];

const addTodo = () => {
  const input = document.getElementById("task-input");
  const errorContainer = document.getElementById("error-container");
  const value = input.value.trim();

  if (value === "") {
    errorContainer.textContent = "Please enter a task";
    return;
  }

  errorContainer.textContent = "";

  const todo = {
    todoId: globalTodoId,
    todoDetails: value,
    isCompleted: false,
    isEditing: false,
  };

  todos.push(todo);
  globalTodoId++;
  input.value = "";

  addTodoToDOM(todo);
};

const addTodoToDOM = (todo) => {
  const parent = document.getElementById("todo-parent");
  const todoItem = document.createElement("div");
  todoItem.id = `todo-${todo.todoId}`;
  todoItem.classList.add("todo-item");

  const todoDetails = document.createElement("div");
  todoDetails.classList.add("todo-details");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isCompleted;
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => toggleTodoCompletion(todo.todoId));
  todoDetails.appendChild(checkbox);

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = todo.todoDetails;
  inputField.readOnly = !todo.isEditing;
  inputField.classList.toggle("todo-editing", todo.isEditing);
  inputField.classList.toggle("todo-text", !todo.isEditing);
  inputField.classList.toggle("completed-task", todo.isCompleted);
  todoDetails.appendChild(inputField);

  const actionButtons = document.createElement("div");
  actionButtons.classList.add("action-buttons");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () =>
    toggleEditTodo(todo, inputField, editButton)
  );
  actionButtons.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    handleDeleteTodo(todo.todoId);
  });
  actionButtons.appendChild(deleteButton);

  todoItem.appendChild(todoDetails);
  todoItem.appendChild(actionButtons);

  parent.appendChild(todoItem);
  inputField.focus();
};

const toggleEditTodo = (todo, inputField, editButton) => {
  todo.isEditing = !todo.isEditing;
  inputField.readOnly = !todo.isEditing;
  editButton.classList.toggle('save-btn',todo.isEditing)
  editButton.textContent = todo.isEditing ? "Save" : "Edit";
  inputField.classList.toggle("todo-editing", todo.isEditing);
  inputField.classList.toggle("todo-text", !todo.isEditing);
  inputField.classList.toggle("editing-focus", todo.isEditing);
  if (todo.isEditing) {
    inputField.focus();
    inputField.classList.toggle("editing-focus", todo.isEditing);
  }
};

const handleDeleteTodo = (id) => {
  const index = todos.findIndex((t) => t.todoId === id);
  if (index > -1) {
    todos.splice(index, 1);
    document.getElementById(`todo-${id}`).remove();
  }
};

const toggleTodoCompletion = (id) => {
  const todo = todos.find((t) => t.todoId === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    document.querySelector(`#todo-${id} .checkbox`).checked = todo.isCompleted;
    document.querySelector(`#todo-${id} input[type='text']`).classList.toggle("completed-task", todo.isCompleted);
  }
};
