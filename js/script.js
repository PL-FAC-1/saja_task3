let button = document.getElementById("enter");
let titleInput = document.getElementById("title");
let descrptionInput = document.getElementById("descrption");
let timeInput = document.getElementById("time");
let list = document.getElementById("list");
let lis = document.querySelectorAll("li");
let removeButtons = document.getElementsByName("remove-button");
let editButtons = document.getElementsByName("edit-button");
let todos = document.getElementById("todos");

button.addEventListener("click", function () {
  if (lengthCheck() > 0) {
    creteItemOnClick();
  }
});
function lengthCheck() {
  return title.value.length && descrption.value.length && time.value.length;
}
let count = 0;
function creteItemOnClick() {
  let ul = document.createElement("ul");
  ul.setAttribute("class", `ul${count}`);
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  let title = document.createElement("li");
  title.setAttribute("class", `titleul${count}`);
  title.appendChild(document.createTextNode(titleInput.value));
  let removeButton = document.createElement("button");
  removeButton.setAttribute("name", "remove-button");
  removeButton.appendChild(document.createTextNode("Remove"));
  removeButton.setAttribute("class", `ul${count}`);
  let editbutton = document.createElement("button");
  editbutton.setAttribute("name", "edit-button");
  editbutton.setAttribute("class", `ul${count}`);
  editbutton.appendChild(document.createTextNode("Edit"));
  let descrption = document.createElement("li");
  descrption.appendChild(document.createTextNode(descrptionInput.value));
  descrption.setAttribute("class", `descriptionul${count}`);
  let time = document.createElement("li");
  time.appendChild(document.createTextNode(timeInput.value));
  time.setAttribute("class", `timeul${count}`);
  ul.appendChild(checkbox);
  ul.appendChild(title);
  ul.appendChild(descrption);
  ul.appendChild(time);
  ul.appendChild(editbutton);
  ul.appendChild(removeButton);
  titleInput.value = "";
  descrptionInput.value = "";
  timeInput.value = "";
  list.appendChild(ul);
  count++;
  todos.textContent = count;
  removeElement();
  EditElement();
}
function removeElement() {
  removeButtons = document.getElementsByName("remove-button");
  removeButtons.forEach((e) => {
    e.addEventListener("click", function () {
      document.querySelector(`ul.${e.getAttribute("class")}`).remove();
      count--;
      todos.textContent = count;
    });
  });
}

function EditElement() {
  editButtons = document.getElementsByName("edit-button");
  editButtons.forEach((e) => {
    e.addEventListener("click", function () {
      e.disabled = true;
      let EditBlock = document.createElement("div");
      console.log(e.getAttribute("class"));
      EditBlock.setAttribute("class", e.getAttribute("class"));
      let titleInput = document.createElement("input");
      titleInput.setAttribute("class", `title${e.getAttribute("class")}`);
      titleInput.placeholder = "Enter title edit";
      let desInput = document.createElement("input");
      desInput.setAttribute("class", `description${e.getAttribute("class")}`);
      desInput.placeholder = "enter descrition edit";
      let timeInput = document.createElement("input");
      timeInput.setAttribute("class", `time${e.getAttribute("class")}`);
      timeInput.placeholder = "enter time edit";

      let save = document.createElement("button");
      save.appendChild(document.createTextNode("save"));
      EditBlock.appendChild(titleInput);
      EditBlock.appendChild(desInput);
      EditBlock.appendChild(timeInput);
      EditBlock.appendChild(save);
      e.parentElement.appendChild(EditBlock);
      save.addEventListener("click", function () {
        e.parentElement.querySelector(
          `li.title${e.getAttribute("class")}`
        ).textContent = e.parentElement.querySelector(
          `input.title${e.getAttribute("class")}`
        ).value;
        e.parentElement.querySelector(
          `li.description${e.getAttribute("class")}`
        ).textContent = e.parentElement.querySelector(
          `input.description${e.getAttribute("class")}`
        ).value;
        e.parentElement.querySelector(
          `li.time${e.getAttribute("class")}`
        ).textContent = e.parentElement.querySelector(
          `input.time${e.getAttribute("class")}`
        ).value;
        EditBlock.remove();
        console.log(e);
        e.disabled = false;
      });
    });
  });
}
