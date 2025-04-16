// const defaultTasks = [
//   { name: 'clean', status: 'done' },
//   { name: 'cook', status: 'pending' },
//   { name: 'sleep', status: ' pending' },
//   { name: 'eat', status: 'done' },
// ];

// let tasks = localStorage.getItem('tasks');

// if (tasks) {
//   tasks = JSON.parse(tasks);
// } else {
//   tasks = defaultTasks;
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// console.log('TASKS-->>', tasks);

// const tasks1 = JSON.parse(localStorage.getItem('tasks') || '[]');

let tasks = [
  { name: 'clean', status: 'done', date: 'april 14,2025' },
  { name: 'cook', status: 'pending', date: 'april 14,2025' },
  { name: 'eat', status: 'done', date: 'april 14,2025' },
];

let input = document.querySelector('.input-field');
let pendingUl = document.querySelector('.pending-ul');
let doneUl = document.querySelector('.done-ul');

tasks.forEach(function (task) {
  let li = document.createElement('li');
  let em = document.createElement('em');
  em.className = 'em';
  em.textContent = task.name;
  li.append(em);

  let delBtn = document.createElement('button');
  delBtn.className = 'del-button';
  addTrashIcon(delBtn);
  delBtn.addEventListener('click', delItemClickHandler);

  if (task.status == 'done') {
    doneUl.append(li);
    li.append(delBtn);
  } else {
    pendingUl.append(li);
    // for existing task
    taskDate = new Date(task.date);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatted = taskDate.toLocaleDateString('en-US', dateOptions);
    let span = document.createElement('span');
    span.className = 'date-span';
    span.textContent = dateFormatted;
    li.append(span);

    let doneBtn = document.createElement('button');
    doneBtn.className = 'done-btn';
    addThumbsUpIcon(doneBtn);
    li.append(doneBtn);
    doneBtn.addEventListener('click', doneClickHandler);
    li.append(delBtn);
  }
});

let addTask = document.querySelector('.add-task');
addTask.textContent = 'Add Task';
let span = document.createElement('span');
span.classList.add('fa-solid', 'fa-rocket', 'fa-shake');
addTask.prepend(span);
addTask.addEventListener('click', function () {
  let task = input.value.trim('');
  if (!task) {
    return alert('oops! Please Add a Task');
  }
  let li = document.createElement('li');
  let em = document.createElement('em');
  em.textContent = input.value;
  li.append(em);

  let taskDate = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = taskDate.toLocaleDateString('en-US', dateOptions);
  let span = document.createElement('span');
  span.className = 'date-span';
  span.textContent = dateFormatted;
  li.append(span);

  let doneBtn = document.createElement('button');
  doneBtn.className = 'done-btn';
  addThumbsUpIcon(doneBtn);
  doneBtn.addEventListener('click', doneClickHandler);
  li.append(doneBtn);

  let delBtn = document.createElement('button');
  delBtn.className = 'del-button';
  addTrashIcon(delBtn);
  li.append(delBtn);
  delBtn.addEventListener('click', delItemClickHandler);

  pendingUl.append(li);

  let newTask = {
    name: input.value,
    status: 'pending',
    date: dateFormatted,
  };
  if (newTask.name.trim() !== '') {
    tasks.push(newTask);
  }

  input.value = ''; // to make input field empty when task added

  // localStorage.setItem('tasks', JSON.stringify(tasks));
});

function doneClickHandler() {
  let taskDate = this.previousSibling;
  doneUl.append(this.parentElement);
  taskName = this.parentElement.children[0].textContent.trim();
  tasks.forEach(function (task) {
    if (task.name == taskName) {
      task.status = 'done';
    }
  });
  this.remove();
  taskDate.remove();
}

function delItemClickHandler() {
  let taskName = this.parentElement.children[0].textContent;
  let confirmDelete = confirm(
    `Are you sure you  want to  delete " ${taskName} ?"` // is a method use to confirm
  );
  if (confirmDelete) {
    tasks = tasks.filter(function (task) {
      return task.name !== taskName;
    });
    this.parentElement.remove();
  }

  // save to local storage
  // if (!tasks.length) {
  //   localStorage.removeItem('tasks');
  // } else localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTrashIcon(btn) {
  let spanIcon = document.createElement('span');
  spanIcon.classList.add('fa-solid', 'fa-trash'); //'fa-shake');
  btn.append(spanIcon);
}

function addThumbsUpIcon(btn) {
  let doneIcon = document.createElement('span');
  doneIcon.classList.add('fa-solid', 'fa-thumbs-up', 'fa-bounce');
  btn.append(doneIcon);
}

// function createTaskDate(li) {
//   taskDate = new Date();
//   const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//   const dateFormatted = taskDate.toLocaleDateString('en-US', dateOptions);
//   let span = document.createElement('span');
//   span.className = 'date-span';
//   span.textContent = dateFormatted;
//   li.append(span);
//   return dateFormatted;
// }
