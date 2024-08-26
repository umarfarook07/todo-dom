// let globalTodoId = 0;
// let todos = [];

// const addItem = () => {
//   const input = document.getElementById("task-input");
//   const errorContainer = document.getElementById('error-container');
//   const value = input.value.trim();
//   if (value === "") {
//     errorContainer.textContent = 'Please enter a task';
//     return;
//   }
//   errorContainer.textContent = '';
//   todos.push({
//     todoId: `todo-input-${globalTodoId}`,
//     editId: `edit-${globalTodoId}`,
//     deleteId: `delete-${globalTodoId}`,
//     TodoTextId: `todo-text-${globalTodoId}`,
//     checkId: `check-${globalTodoId}`,
//     title: value,
//     isEditing: false,
//     isCompleted: false,
//   });
//   globalTodoId++;
//   renderTodos(todos);
//   input.value = "";
// }

// const deleteItem = (id) => {
//   const index = todos.findIndex((todo) => todo.todoId === id);
//   if (index !== -1) {
//     todos.splice(index, 1);
//     renderTodos(todos);
//   }
// }

// const toggleEditItem = (id) => {
//   const todo = todos.find((todo) => todo.todoId === id);
//   if (todo) {
//     if (todo.isEditing) {
//       const input = document.getElementById(todo.TodoTextId);
//       const title = input.value.trim();
//       if (title === "") {
//         input.value = todo.title;
//       } else {
//         todo.title = title;
//       }
//     }
//     todo.isEditing = !todo.isEditing;
//     renderTodos(todos);
//   }
// }

// const checkItem = (id) => {
//   const todo = todos.find((todo) => todo.todoId === id);
//   if (todo) {
//     todo.isCompleted = !todo.isCompleted;
//     renderTodos(todos);
//   }
// }

// const renderTodos = (todos) => {
//   const parent = document.getElementById("todo-parent");

//   parent.innerHTML = "";
//   todos.forEach((todo) => {
//     const todoItem = document.createElement("div");
//     todoItem.id = todo.todoId;
//     todoItem.classList.add("todo-item");

//     const todoDetails = document.createElement("div");
//     todoDetails.classList.add("todo-details");

//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     // checkbox.id = todo.checkId;
//     checkbox.checked = todo.isCompleted;
//     checkbox.classList.add("checkbox");
//     todoDetails.appendChild(checkbox);

//     const inputField = document.createElement("input");
//     inputField.type = "text";
//     // inputField.id = todo.TodoTextId;
//     inputField.value = todo.title;
//     inputField.readOnly = !todo.isEditing;
//     inputField.classList.toggle("todo-editing", todo.isEditing);
//     inputField.classList.toggle("todo-text", !todo.isEditing);
//     todoDetails.appendChild(inputField);

//     const actionButtons = document.createElement("div");
//     actionButtons.classList.add("action-buttons");

//     const editDeleteButton = document.createElement("button");
//     // editDeleteButton.id = todo.isEditing ? todo.editId : todo.deleteId;
//     editDeleteButton.classList.toggle("save-btn", todo.isEditing);
//     editDeleteButton.classList.toggle("edit-btn", !todo.isEditing);
//     editDeleteButton.classList.toggle("delete-btn", !todo.isEditing);
//     editDeleteButton.textContent = todo.isEditing ? "Save" : "Delete";
//     actionButtons.appendChild(editDeleteButton);

//     todoItem.appendChild(todoDetails);
//     todoItem.appendChild(actionButtons);

//     parent.appendChild(todoItem);

//     editDeleteButton.addEventListener("click", () => {
//       if (todo.isEditing) {
//         toggleEditItem(todo.todoId);
//       } else {
//         deleteItem(todo.todoId);
//       }
//     });
//     checkbox.addEventListener("click", () => {
//       checkItem(todo.todoId);
//     });
//     if (todo.isEditing) {
//       inputField.focus();
//       inputField.classList.add("editing-focus");
//     }
//     if (todo.isCompleted) {
//       inputField.classList.add("completed-task");
//     }
//   });
// }

// const renderTodos = ()

let globalTodoId = 1; // Initialize the globalTodoId
let todos = []; // Initialize the todos array

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
    todoDetails: input.value,
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
  todoDetails.appendChild(inputField);

  const actionButtons = document.createElement("div");
  actionButtons.classList.add("action-buttons");

  const editDeleteButton = document.createElement("button");
  editDeleteButton.classList.toggle("save-btn", todo.isEditing);
  editDeleteButton.classList.toggle("edit-btn", !todo.isEditing);
  editDeleteButton.classList.toggle("delete-btn", !todo.isEditing);
  editDeleteButton.textContent = todo.isEditing ? "Save" : "Delete";
  editDeleteButton.addEventListener("click", () =>
    handleTodoAction(todo.todoId)
  );
  actionButtons.appendChild(editDeleteButton);

  todoItem.appendChild(todoDetails);
  todoItem.appendChild(actionButtons);

  parent.appendChild(todoItem);
};

const toggleTodoCompletion = (id) => {
  const todo = todos.find((t) => t.todoId === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    document.getElementById(`todo-${id}`).querySelector(".checkbox").checked =
      todo.isCompleted;
    document.getElementById()
  }
};

const handleTodoAction = (id) => {
  const todo = todos.find((t) => t.todoId === id);
  if (todo.isEditing) {
    const inputField = document
      .getElementById(`todo-${id}`)
      .querySelector("input[type='text']");
    todo.todoDetails = inputField.value;
    todo.isEditing = false;
    updateTodoInDOM(todo);
  } else {
    todos = todos.filter((t) => t.todoId !== id);
    document.getElementById(`todo-${id}`).remove();
  }
};

const updateTodoInDOM = (todo) => {
  const todoItem = document.getElementById(`todo-${todo.todoId}`);
  const inputField = todoItem.querySelector("input[type='text']");
  inputField.readOnly = true;
  inputField.classList.remove("todo-editing");
  inputField.classList.add("todo-text");

  const button = todoItem.querySelector("button");
  button.classList.remove("save-btn");
  button.classList.add("edit-btn");
  button.classList.add("delete-btn");
  button.textContent = "Delete";
};
