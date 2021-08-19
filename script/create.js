const TODO_BASE_URL = "https://awsc4v.deta.dev/todos"

const newTodo = {
  completed: false
}

const formTitleDom = document.getElementById("form-title")
const formDetailDom = document.getElementById("form-detail")

function handleButtonSaveClick() {
  createTodo(newTodo)
}

function createTodo(newTodo) {
  fetch(TODO_BASE_URL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newTodo),
  })
    .then(function (response) {
      if (response.ok) {
        handleCreateTodoSuccess()
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}


formTitleDom.addEventListener('change', function (event) {
  newTodo.title = event.target.value
})

formDetailDom.addEventListener('change', function (event) {
  newTodo.description = event.target.value
})



function handleCreateTodoSuccess() {
  alert("Create new todo success")
  formTitleDom.value = ''
  formDetailDom.value = ''
}