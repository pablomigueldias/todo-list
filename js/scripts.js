// Elementos
const todoForm = document.querySelector("#form-todo");
const todoInput = todoForm.querySelector("input");
const containerGeral = document.querySelector(".container-geral");
const editInfoInput = document.querySelector(".form-edit input");
const editInfoForm = document.querySelector(".edit-info");
const editSubmit = document.querySelector(".botaoEdit-todo button");
const voltarBtn = document.querySelector(".botao-back");
const inputProcurar = document.querySelector(".procurar input");
const botaoLimpar = document.querySelector(".procurar button");
const filtro = document.querySelector(".filtros");

let todoAtual = null;

// Funções

function toggleForms() {
  editInfoForm.classList.toggle("hiden");
  todoForm.classList.toggle("hiden");
}

function salvarTodo(texto, feitoLocal = 0, salvar = 1) {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const tituloDiv = document.createElement("div");
  tituloDiv.classList.add("info-todo");
  const paragr = document.createElement("p");
  paragr.innerHTML = texto;
  tituloDiv.appendChild(paragr);
  todo.appendChild(tituloDiv);

  const botaoDiv = document.createElement("div");
  botaoDiv.classList.add("botao-todo");

  const botaoFeito = document.createElement("button");
  botaoFeito.classList.add("botao-feito");
  botaoFeito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>`;
  botaoDiv.appendChild(botaoFeito);
  todo.appendChild(botaoDiv);

  const botaoEdit = document.createElement("button");
  botaoEdit.classList.add("botao-edit");
  botaoEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>`;
  botaoDiv.appendChild(botaoEdit);

  const botaoDelete = document.createElement("button");
  botaoDelete.classList.add("botao-delete");
  botaoDelete.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>`;
  botaoDiv.appendChild(botaoDelete);

  // local Storage

  if (feitoLocal) {
    todo.classList.add("feitoLocal");
  }

  if (salvar) {
    salvarTodoLocalStorage({ texto, feitoLocal });
  }

  todo.appendChild(botaoDiv);
  containerGeral.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
}

function pegarProcura() {
  const pesquisar = inputProcurar.value.toLowerCase();

  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const textoTodo = todo.querySelector("p").innerText.toLowerCase();

    const normalizarProcura = pesquisar.toLowerCase();

    todo.style.display = "flex";

    if (!textoTodo.includes(normalizarProcura)) {
      todo.style.display = "none";
    }
  });
}

function filtrosTodos(filtroValor) {
  const todos = document.querySelectorAll(".todo");

  switch (filtroValor) {
    case "todos":
      todos.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "feitos":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );
      break;

    case "afazer":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "none")
          : (todo.style.display = "flex")
      );
      break;

    default:
      break;
  }
}

// Eventos

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const valueInput = todoInput.value;

  if (valueInput) {
    salvarTodo(valueInput);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (elemento) => {
    const elementoTargetFeito = elemento.target.closest(".botao-feito");
    const elementoTargetDelete = elemento.target.closest(".botao-delete");
    const elementoTargetEdit = elemento.target.closest(".botao-edit");

    if (elementoTargetFeito) {
      const todo = elementoTargetFeito.closest(".todo");
      if (todo) {
        todo.classList.toggle("done");
        updateTodosLocalStorage(todo);
      }
    }

    if (elementoTargetDelete) {
      const todo = elementoTargetDelete.closest(".todo");
      if (todo) {
        todo.remove();
        removerTodoLocalStorage(todo);
      }
    }

    if (elementoTargetEdit) {
      const todo = elementoTargetEdit.closest(".todo");
      if (todo) {
        todoAtual = todo;

        const titulo = todo.querySelector("p").innerHTML;

        editInfoInput.value = titulo;

        toggleForms();
      }
    }
  });
});

editSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  if (todoAtual) {
    const titulo = todoAtual.querySelector("p");
    const textoAntigo = titulo.innerHTML;
    const novoTexto = editInfoInput.value;

    titulo.innerHTML = novoTexto;

    updateTodoTextoLocalStorage(textoAntigo, novoTexto);

    todoAtual = null;

    toggleForms();
  }
});

voltarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

inputProcurar.addEventListener("keyup", pegarProcura);

botaoLimpar.addEventListener("click", (e) => {
  e.preventDefault();

  inputProcurar.value = "";

  inputProcurar.dispatchEvent(new Event("keyup"));
});

filtro.addEventListener("change", (e) => {
  const filtroValor = e.target.value;

  filtrosTodos(filtroValor);
});

// Local Storage

const pegarTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

const salvarTodoLocalStorage = (novoTodo) => {
  const todos = pegarTodosLocalStorage();
  todos.push(novoTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const carregarTodos = () => {
  const todos = pegarTodosLocalStorage();
  todos.forEach((todo) => {
    salvarTodo(todo.texto, todo.feitoLocal, 0);
  });
};

const updateTodosLocalStorage = (todoElement) => {
  const textoTodo = todoElement.querySelector("p").innerText;
  const todos = pegarTodosLocalStorage();

  todos.forEach((todo) => {
    if (todo.texto === textoTodo) {
      todo.feitoLocal = !todo.feitoLocal;
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removerTodoLocalStorage = (todoElement) => {
  const textoTodo = todoElement.querySelector("p").innerText;
  const todos = pegarTodosLocalStorage();

  const filtrarTodos = todos.filter((todo) => todo.texto !== textoTodo);

  localStorage.setItem("todos", JSON.stringify(filtrarTodos));
};

document.addEventListener("DOMContentLoaded", carregarTodos);

const updateTodoTextoLocalStorage = (textoAntigo, novoTexto) => {
  const todos = pegarTodosLocalStorage();

  todos.forEach((todo) => {
    if (todo.texto === textoAntigo) {
      todo.texto = novoTexto;
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};
