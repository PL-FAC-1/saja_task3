const addButton = document.getElementById("addButton");
const addForm = document.getElementById("addForm");
const mainStatment = document.getElementById("mainStatment");
const editDiv = document.getElementById("editDiv");
const todoTitle = document.getElementById("todoTitle");
const tododescription = document.getElementById("tododescription");
const todoTime = document.getElementById("todoTime");
const todoList = document.getElementById("todoList");
const inputs = document.querySelectorAll(".addForm__input");
const count = document.getElementById("count");
const checkbox = document.getElementById("itemcheck");

addButton.addEventListener("click", () => (addForm.style.display = "flex"));
let id = localStorage.getItem("counter");
if (id === null) {
  id = 0;
}
localStorage.setItem("counter", id);
let number = JSON.parse(window.localStorage.getItem("tasks"));
number=number?number.length:0;
let todos = [];

todoList.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    deleteTodo(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.className == "edit") {
    addForm.style.display = "none";
    mainStatment.style.display = "none";
    editDiv.style.display = "flex";
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    todos.forEach((todo) => {
      if (todo.id == id) {
        editTodo(todo);
      }
    });
  }
  if (e.target.className == "todo__checkBox") {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    todos.map((todo) => {
      if (todo.id == id) {
        todo.checked = !todo.checked;
        if (todo.checked) {
          e.target.parentElement.parentElement.querySelector(
            ".todo__content"
          ).style.textDecoration = "line-through";
        } else {
          e.target.parentElement.parentElement.querySelector(
            ".todo__content"
          ).style.textDecoration = "none";
        }
      }
    });
    addToLocalStorage();
  }
});

if (localStorage.getItem("tasks")) {
  todos = JSON.parse(localStorage.getItem("tasks"));
  number = JSON.parse(window.localStorage.getItem("tasks")).length;
  count.textContent = number;
}

getfromLocalStorage();

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  id++;
  localStorage.setItem("counter", id);
  AddToDo();
  diplayToDos();
  addToLocalStorage();
});
function lengthCheck(title, description, time) {
  return title.value.length && description.value.length && time.value.length;
}
function AddToDo() {
  if (lengthCheck(todoTitle, tododescription, todoTime)) {
    addForm.style.display = "none";
    const title = todoTitle.value;
    const description = tododescription.value;
    const time = todoTime.value;
    const todo = {
      id: id,
      title,
      description,
      time,
      checked: false,
    };
    todos.push(todo);
    inputs.forEach((e) => (e.value = ""));
    number++;
    count.textContent = number;
  } else {
    alert("plaese fill all fields");
  }
}

function diplayToDos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    let tododiv = document.createElement("div");
    tododiv.className = "list__todo flex";
    tododiv.setAttribute("data-id", todo.id);
    let checkDiv = document.createElement("div");
    checkDiv.className = "todo__check flex";
    let checkLabel = document.createElement("label");
    checkLabel.setAttribute("for", `itemcheck${todo.id}`);
    checkLabel.innerHTML = "CheckTask";
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `itemcheck${todo.id}`);
    checkbox.className = "todo__checkBox";
    checkbox.checked = todo.checked;
    let todoContent = document.createElement("div");
    todoContent.className = "todo__content";
    checkbox.checked
      ? (todoContent.style.textDecoration = "line-through")
      : (todoContent.style.textDecoration = "none");
    let title = document.createElement("p");
    title.className = "content__title";
    title.appendChild(document.createTextNode(todo.title));
    let description = document.createElement("p");
    description.className = "content__description";
    description.appendChild(document.createTextNode(todo.description));
    let time = document.createElement("p");
    time.appendChild(document.createTextNode(todo.time));
    time.className = "content__time";
    todoContent.append(title, description, time);
    let todo__buttons = document.createElement("div");
    todo__buttons.className = "flex todo__buttons";
    let edit = document.createElement("button");
    edit.appendChild(document.createTextNode("Edit"));
    edit.className = "edit";
    let remove = document.createElement("button");
    remove.appendChild(document.createTextNode("Delete"));
    remove.className = "delete";
    todo__buttons.append(edit, remove);
    checkDiv.append(checkLabel, checkbox);
    todoList.appendChild(tododiv);
    tododiv.append(checkDiv, todoContent, todo__buttons);
  });
}

function addToLocalStorage() {
  window.localStorage.setItem("tasks", JSON.stringify(todos));
}

function getfromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    diplayToDos(tasks);
  }
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id != todoId);
  addToLocalStorage(todos);
  id--;
  localStorage.setItem("counter", id);
  number--;
  count.textContent = number;
}

function editTodo(todo) {
  editDiv.innerHTML = "";
  let editForm = document.createElement("form");
  editForm.className = "main__editForm";
  let titlelabel = document.createElement("label");
  titlelabel.setAttribute("for", "title");
  titlelabel.textContent = "Title:";
  let titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "title");
  titleInput.className = "editform__input";
  titleInput.value = todo.title;
  let descritionlabel = document.createElement("label");
  descritionlabel.setAttribute("for", "description");
  descritionlabel.textContent = "Description:";
  let descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.setAttribute("id", "description");
  descriptionInput.value = todo.description;
  descriptionInput.className = "editform__input";
  let timelabel = document.createElement("label");
  timelabel.setAttribute("for", "time");
  timelabel.textContent = "Time:";
  let timeInput = document.createElement("input");
  timeInput.className = "editform__input";
  timeInput.setAttribute("type", "time");
  timeInput.setAttribute("id", "time");
  timeInput.value = todo.time;
  let saveButton = document.createElement("input");
  saveButton.setAttribute("type", "submit");
  saveButton.value = "Save";
  saveButton.className = "editform__save";
  editForm.append(
    titlelabel,
    titleInput,
    descritionlabel,
    descriptionInput,
    timelabel,
    timeInput,
    saveButton
  );
  editDiv.appendChild(editForm);
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (lengthCheck(titleInput, descriptionInput, timeInput)) {
      todos.map((todoItem) => {
        if (todoItem.id == todo.id) {
          todoItem.title = titleInput.value;
          todoItem.description = descriptionInput.value;
          todoItem.time = timeInput.value;
        }
      });
      mainStatment.style.display = "flex";
      editForm.remove();
      addToLocalStorage(todos);
      getfromLocalStorage();
    } else {
      alert("plaese fill all fields");
    }
  });
}
