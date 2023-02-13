let darkModeBtn = document.querySelector('#darkMode');
let lightModeBtn = document.querySelector('#lightMode');
let navbar = document.querySelector('#navbar');
let navbarHead = document.querySelector('#navbarHead');
let todoForm = document.querySelector('#todoForm');
let todoInputLabel = document.querySelector('#todoInputLabel');
let todoHelp = document.querySelector('#todoHelp');
let mainPage = document.querySelector('#mainPage');
let todoListHeader = document.querySelector('#todoListHeader');
let todoCards = Array.from(document.getElementsByClassName('todoCard'));
let todoInput = document.querySelector('#todoInput');
let searchInput = document.querySelector('#searchInput');
let todoList = document.querySelector('#todoList');

// Random Id Generating Functionality...
const randomIdGen = () => {
  let randomId = new Date().getTime().toLocaleString();
  return randomId;
};

let myTODOs = [];

// Delete a Todo...
const deleteTodo = (id) => {
    myTODOs = myTODOs.filter((todoitem)=>{
        return todoitem.todoid !== id;
    })
    todoInput.value = "";
    fetchTodos();
}

// Toggle Completion of TODO...
const toggleComplete = (id,state) => {
    myTODOs.map((todoitem)=>{
        if (todoitem.todoid === id) {
            todoitem.completed = state;
        }
    })
    todoInput.value = "";
    fetchTodos();
}

let outerDiv = document.createElement('div');
outerDiv.classList.add('w-100','d-flex','align-items-center','justify-content-start');
let textSpan = document.createElement('span');
textSpan.classList.add('fs-4','pfont');
textSpan.textContent = 'Nothing! Add a Todo here...'
outerDiv.append(textSpan);
todoList.append(outerDiv);

// Fetching all TODO's...
const fetchTodos = () => {
    todoList.innerHTML = '';
    if (myTODOs.length > 0) {
        console.log('Fetching TODOs...');
        myTODOs.map((todoItem)=>{
            const {todo,todoid,completed} = todoItem;

            let card = document.createElement("div");
            card.classList.add(
              "card",
              "todoCard",
              "d-flex",
              "py-2",
              "flex-column",
              "justify-content-between",
              "align-items-start",
              "w-auto",
              "border-2",
              "border-black",
              "bg-light"
            );

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body", "pfont", "text-black", 'text-center');
            cardBody.innerHTML = todo;

            let completedBtns = document.createElement("div");
            completedBtns.classList.add("d-flex",'flex-row','w-100','justify-content-between','align-items-center','px-3');

            let cardButtons = document.createElement("div");
            cardButtons.classList.add(
              "card-buttons",
              "d-flex",
              "flex-row",
              "gap-2",
              "my-1"
            );
            let completeBtn = document.createElement("button");
            let incompleteBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");
            completeBtn.type = "button";
            incompleteBtn.type = "button";
            deleteBtn.type = "button";
            completeBtn.title = "Complete";
            incompleteBtn.title = "Incomplete";
            deleteBtn.title = "Delete";
            completeBtn.addEventListener('click',()=>{
                toggleComplete(todoid,true);
            })
            incompleteBtn.addEventListener('click',()=>{
                toggleComplete(todoid,false);
            })
            deleteBtn.addEventListener('click',()=>{
                deleteTodo(todoid);
            })
            completeBtn.classList.add("btn", "btn-outline-success");
            incompleteBtn.classList.add("btn", "btn-outline-warning");
            deleteBtn.classList.add("btn", "btn-danger");
            completeBtn.innerHTML = `<i class="fa-solid fa-check fs-6"></i>`;
            incompleteBtn.innerHTML = `<i class="fa-solid fa-xmark fs-6"></i>`;
            deleteBtn.innerHTML = `<i class="fa-solid fa-trash fs-6"></i>`;

            cardButtons.append(completed ? incompleteBtn : completeBtn , deleteBtn);

            let doneSpan = document.createElement('span');
            doneSpan.classList.add('fs-6',`${completed ? 'text-success' : 'text-warning'}`, 'pfont','fw-bold');
            doneSpan.innerHTML = `${completed ? 'Completed' : 'Incomplete'}`;

            completedBtns.append(cardButtons,doneSpan);

            card.append(cardBody, completedBtns);

            todoList.append(card);

        })
    }
    else {
        let outerDiv = document.createElement('div');
        outerDiv.classList.add('w-100','d-flex','align-items-center','justify-content-start');
        let textSpan = document.createElement('span');
        textSpan.classList.add('fs-4','pfont');
        textSpan.textContent = 'Nothing! Add a Todo here...'
        outerDiv.append(textSpan);
        todoList.append(outerDiv);
    }

}

// Adding TODO.
const todoAdd = (event) => { 
    event.preventDefault();
    let value = todoInput.value;
    if (value) {
        let newToDo = {
            todoid : randomIdGen(),
            todo : value,
            completed : false
        }
        myTODOs = [...myTODOs, newToDo];
    }
    todoInput.value = '';
    fetchTodos();
}

const loadTodos = () => {
  if (localStorage.getItem("todos")) {
    myTODOs = JSON.parse(localStorage.getItem("mytodos"));
    fetchTodos();
  }
};

loadTodos();

const saveTodos = () => {
  localStorage.setItem("mytodos", JSON.stringify(myTODOs));
};

let clrInterval = setInterval(()=>{
    saveTodos();
},1000);

// Toggle Screen Mode Functionality...
const toggleMode = (mode) => {

    if (mode === 'dark') {
        lightModeBtn.classList.remove('d-none');
        darkModeBtn.classList.add('d-none');
        navbar.classList.add('backgroundN');
        navbarHead.classList.add('text-white');
        todoForm.classList.add('backgroundF');
        todoInputLabel.classList.add('backgroundF');
        todoInput.classList.add('backgroundS');
        searchInput.classList.add('backgroundS');
        todoInput.classList.remove('bg-light');
        searchInput.classList.remove('bg-light');
        todoHelp.classList.add('backgroundF');
        mainPage.classList.add('backgroundF');
        document.body.classList.add('backgroundF');
        todoListHeader.classList.add('backgroundF');
    }
    
    if (mode === 'light') {
        lightModeBtn.classList.add("d-none");
        darkModeBtn.classList.remove("d-none");
        navbar.classList.remove('backgroundN');
        navbarHead.classList.remove('text-white');
        todoForm.classList.remove("backgroundF");
        todoInputLabel.classList.remove("backgroundF");
        todoInput.classList.remove('backgroundS');
        todoInput.classList.add('bg-light')
        searchInput.classList.remove('backgroundS');
        todoHelp.classList.remove("backgroundF");
        mainPage.classList.remove('backgroundF');
        document.body.classList.remove('backgroundF');
        todoListHeader.classList.remove('backgroundF');
    }
    
}


/*

    ToDo Card Design Example...

    <div class="card todoCard d-flex py-2 flex-column justify-content-between align-items-start w-auto border-2 border-black">
        <div class="card-body pfont">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, animi?
        </div>
        <div class="card-buttons px-3 d-flex flex-row gap-2 my-1">
            <button type="button" title="Done" class="btn btn-outline-success"><i class="fa-solid fa-check fs-6"></i></button>
            <button type="button" title="Delete" class="btn btn-danger"><i class="fa-solid fa-trash fs-6"></i></button>
        </div>
    </div>
*/