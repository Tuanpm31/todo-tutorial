const TODO_BASE_URL = "https://awsc4v.deta.dev/todos"

const url = new URL(location.href);
const currentTodoKey = url.searchParams.get("key");

let currentTodo = {}

const formTitleDom = document.getElementById("form-title")
const formDetailDom = document.getElementById("form-detail")

formTitleDom.addEventListener('change', function (event) {
  currentTodo.title = event.target.value
})

formDetailDom.addEventListener('change', function (event) {
  currentTodo.description = event.target.value
})


fetchTodo(currentTodoKey)


function fetchTodo(key) {
  fetch(`${TODO_BASE_URL}/${key}`)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (json) {
      handleGetTodo(json)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function deleteTodo(key) {
  fetch(`${TODO_BASE_URL}/${key}`, {
    method: 'DELETE'
  })
    .then(function (response) {
      if (response.ok) {
        alert(`Delete todo with key ${key} success`)
        window.location.href = "/index.html"
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}

function updateTodo() {
  fetch(TODO_BASE_URL, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(currentTodo)
  })
    .then(function (response) {
      if (response.ok) {
        alert(`Update todo with key ${currentTodo.key} success`)
        window.location.href = "/index.html"
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}

function handleGetTodo(json) {
  currentTodo = json
  formTitleDom.value = currentTodo.title
  formDetailDom.value = currentTodo.description
}

function saveButtonClick() {
  updateTodo()
}

function deleteButtonClick() {
  deleteTodo(currentTodo.key)
}