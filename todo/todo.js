const fs = require('fs')
const filePath = './task.json' 

let command = process.argv[2]
let argument = process.argv[3]
let id = process.argv[4]

// getting all task to update
function loadTask() {
  try {
    const bufferData = fs.readFileSync(filePath); //returns buffer data
    const dataJson = bufferData.toString(); //not real json
    return JSON.parse(dataJson) //json data
  } catch (error) {
    console.log(error)
    return []
  }
}

// saving all tasks
function saveTasks(allTasks) {
  const dataJSON = JSON.stringify(allTasks) //string data
  fs.writeFileSync(filePath, dataJSON)
}

// for getting new Id everytime used
function newId() {
  return Date.now() + Math.floor(Math.random() * 500)
}

// adding task
function addTask(task) {
  if (!task || task.trim() === "" || !isNaN(task)) {
    console.log('Task should be a valid string and should not be empty')
    return;
  }
  const allTasks = loadTask()
  allTasks.push({ task: task, id: parseInt(newId()) })
  saveTasks(allTasks)
  console.log('Task ADded,', task)
}

// priting all the task 
function listTask() {
  const tasks = loadTask()
  tasks.forEach((elem) => console.log(`${elem.id} -> ${elem.task}`))
}

//remove specific task with id
function removeTask(id) {
  const allTask = loadTask();
  let newTask = allTask.filter(elem => elem.id !== id)
  saveTasks(newTask)
}
//updating specific task with id
function updateTask(task, id) {
  let allTasks = loadTask()
  console.log(allTasks)
  let t = allTasks.find(todo => todo.id === id)
  t.task = task
  saveTasks(allTasks)
  console.log(allTasks, "----")
}


// node folder/file command argument ..
if (command === 'add') {
  addTask(argument)
} else if (command === 'list') {
  listTask()
} else if (command === 'remove') {
  removeTask(parseInt(argument)) // to number 
} else if (command === 'update') {
  updateTask(argument,  parseInt(id))
} else {
  console.log('Command not found !!')
}