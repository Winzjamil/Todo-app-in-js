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
  { name: 'clean', status: 'done' },
  { name: 'cook', status: 'pending' },
  { name: 'sleep', status: ' pending' },
  { name: 'eat', status: 'done' },
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
  let spanIcon = document.createElement('span');
  spanIcon.classList.add('fa-solid', 'fa-trash');
  spanIcon.style.textAlign = 'center';
  spanIcon.style.color = '#E52020';
  delBtn.prepend(spanIcon);

  delBtn.addEventListener('click', delItem);

  if (task.status == 'done') {
    doneUl.append(li);
    li.append(delBtn);
  } else {
    pendingUl.append(li);
    let doneBtn = document.createElement('button');
    doneBtn.textContent = 'OK';
    doneBtn.addEventListener('click', doneClickHandler);

    li.append(doneBtn);
    li.append(delBtn);
  }
});
let addTask = document.querySelector('.add-task');

addTask.addEventListener('click', function () {
  if (input.value.trim('') === '') {
    return alert(' please add something');
  }

  let li = document.createElement('li');
  let em = document.createElement('em');
  em.textContent = input.value;
  li.append(em);
  let doneBtn = document.createElement('button');
  doneBtn.textContent = 'OK';

  doneBtn.addEventListener('click', doneClickHandler);

  let delBtn = document.createElement('button');
  delBtn.className = 'del-button';
  let spanIcon = document.createElement('span');
  spanIcon.classList.add('fa-solid', 'fa-trash');
  spanIcon.style.textAlign = 'center';
  spanIcon.style.color = '#E52020';
  delBtn.prepend(spanIcon);
  // delBtn.prepend(spanIcon);

  delBtn.addEventListener('click', delItem);
  li.append(doneBtn);
  li.append(delBtn);
  pendingUl.append(li);
  let newTask = {
    name: input.value,
    status: 'pending',
  };

  tasks.push(newTask);
  input.value = '';

  // localStorage.setItem('tasks', JSON.stringify(tasks));
});
console.log();

function doneClickHandler() {
  doneUl.append(this.parentElement);
  taskName = this.previousSibling.textContent.trim();
  tasks.forEach(function (task) {
    if (task.name == taskName) {
      task.status = 'done';
    }
  });
  this.remove();
}

function delItem() {
  let taskName = this.parentElement.children[0].textContent;
  // console.log(this.parentElement);
  tasks = tasks.filter(function (task) {
    return task.name !== taskName;
  });

  // save to local storage
  // if (!tasks.length) {
  //   localStorage.removeItem('tasks');
  // } else localStorage.setItem('tasks', JSON.stringify(tasks));

  this.parentElement.remove();
}
