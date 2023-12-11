// select html document using dom
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterInput = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-todos');

immediateLoadEventListeners()

function immediateLoadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTodos);
    todoForm.addEventListener('submit', addTodo);
    filterInput.addEventListener('keyup', filterTodo);
    todoList.addEventListener('click', deleteTodo);
    clearButton.addEventListener('click', clearTodos);
};

//function untuk membuat element untuk todo item
function createTodoItem(value){
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center mb-1';
    li.appendChild(document.createTextNode(value));
    
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'badge badge-danger delete-todo';
    link.textContent = 'delete';

    li.appendChild(link);

    todoList.appendChild(li);
}

// fitur menambah todo ke todolist
function addTodo(e){
    e.preventDefault();
    const input = todoInput.value;

    if (input){
        createTodoItem(input);
        addToLocalStorage(input);
        todoInput.value = '';
    }else{
        alert('Todo input tidak boleh kosong!');
    }
};

// fitur untuk memfilter todolist yang dicari
function filterTodo(e){
    const value = e.target.value.toLowerCase();
    const todoItem = document.querySelectorAll('#todo-list li');
    
    todoItem.forEach(item => {
        const itemText = item.firstChild.textContent;
        if (itemText.indexOf(value) !== -1){
            item.setAttribute('style', 'display:block');
        }else{
            item.setAttribute('style', 'display:none !important');
        }
    });
}

// fitur untuk delete todo yang ingin dihapus
function deleteTodo(e){
    if (e.target.classList.contains('delete-todo')){
        if (confirm('apakah anda yakin untuk menghapus?')){
            const parent = e.target.parentElement;
            parent.remove();
            deleteTodoLocalStorage(parent.firstChild.textContent);
        }
    }
};

// fitur untuk menghapus semua todo di dalam todolist
function clearTodos(){
    todoList.innerHTML = '';
    clearTodosLocalStorage();   
};

//untuk mengambil todo yang ada di dalam local storage
function getItemFromLocalStorage(){
    let todo;
    if (localStorage.getItem('todo-item') == null){
        todo = [];
    }else{
        todo = JSON.parse(localStorage.getItem('todo-item'))
    }

    return todo;
}

// fitur untuk memasukkan data input ke dalam local storage
function addToLocalStorage(value){
    let todos = getItemFromLocalStorage();

    todos.push(value);
    localStorage.setItem('todo-item', JSON.stringify(todos));
}

// fitur untuk menampilkan todo yang ada di local storage
function getTodos(){
    let todos = getItemFromLocalStorage();
    todos.forEach(item =>{
        createTodoItem(item);
    })
}

//fitur untuk delete todo yang ada di local storage
function deleteTodoLocalStorage(value){
    let todos = getItemFromLocalStorage();
    todos.forEach((item, index) => {
        if (item == value){
            todos.splice(index, 1);
        };
    });

    localStorage.setItem('todo-item', JSON.stringify(todos));
}

// fitur delete semua todo-item di dalam local storage
function clearTodosLocalStorage(){
    localStorage.clear();
}