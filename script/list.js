const TODO_BASE_URL = "https://awsc4v.deta.dev/todos"

fetchAllTodos()

function fetchAllTodos() {
  fetch(TODO_BASE_URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      handleJsonTodoResponse(json)
    })
    .catch(function (err) {
      console.log(err)
    })
}

function handleJsonTodoResponse(json) {
  const todoListsDom = document.getElementById("list-todos")
  todoListsDom.innerHTML = ''
  for (let i = 0; i < json.length; i++) {
    const element = json[i]
    const todoHtml = `
      <div class="todo-item">
        <div class="todo-item-wrapper">
          <div class="todo-icon" data-id=${element.key} data-completed=${element.completed} onclick="onTodoCheckClick(this)">
            <img style="display: ${getTodoDisplay(element.completed)};" src="images/icon-check.svg" alt="icon-check">
          </div>
          <div class="todo-content" onclick="location.href='/update.html?key=${element.key}'">
            <h3 class="todo-content-title">${element.title}</h3>
            <h4 class="todo-content-description">
              ${element.description}
            </h4>
          </div>
        </div>
      </div>
    `
    todoListsDom.innerHTML += todoHtml
  }
}

function getTodoDisplay(completed) {
  if (completed) {
    return "block"
  } else {
    return "none"
  }
}

function onTodoCheckClick(dom) {
  const key = dom.getAttribute("data-id")
  const completed = dom.getAttribute("data-completed")

  const isCompletedBoolean = (completed === 'true')


  const bodyPayload = {
    "key": key,
    "completed": !isCompletedBoolean
  }

  console.log(bodyPayload)

  fetch(`${TODO_BASE_URL}/tick/${key}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyPayload)
  })
    .then(function (response) {
      fetchAllTodos()
    })
    .catch(function (err) {
      console.log(err)
    })
}