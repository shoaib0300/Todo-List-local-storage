const ul = document.querySelector('ul');
const input = document.getElementById('item');

let itemsArray = localStorage.getItem('items') ?
  JSON.parse(localStorage.getItem('items')) : [];

function addTask(task) {
  const li = document.createElement('li');
  li.classList.add('animated-element');


  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'checkboxID';
  checkbox.checked = task.completed;

  checkbox.addEventListener('change', function() {
    task.completed = this.checked;
    localStorage.setItem('items', JSON.stringify(itemsArray));
  });

  const span = document.createElement('span');
  span.textContent = task.text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'DELETE';
  deleteButton.onclick = function() {
    deleteTask(task);
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  ul.appendChild(li);
}

function deleteTask(task) {
  const index = itemsArray.indexOf(task);

  if (index !== -1) {
    itemsArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    renderTasks();
  }
}

function renderTasks() {
  ul.innerHTML = '';
  itemsArray.forEach(addTask);
}

function add() {
  if (input.value !== '') {
    const task = {
      text: input.value,
      completed: false
    };
    itemsArray.push(task);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    addTask(task);
    input.value = '';
  }
}

function del() {
  localStorage.removeItem('items');
  ul.innerHTML = '';
  itemsArray = [];
}

input.addEventListener("keydown", function(event) {
  if (event.key == "Enter") {
    add();
  }
});

renderTasks();