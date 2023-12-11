// select html document using dom
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterTodo = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearTodos = document.querySelector('#clear-todos');

immediateLoadEventListeners()

function immediateLoadEventListeners(){
    todoForm.addEventListener('submit', addTodo);
    filterTodo.addEventListener('keyup', filterTodo);
};

function addTodo(e){
    e.preventDefault();
    const input = todoInput.value;

    if (input){
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center mb-1';
        li.appendChild(document.createTextNode(input));
        
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'badge badge-danger';
        link.textContent = 'delete';

        li.appendChild(link);

        todoList.appendChild(li);
        todoInput.value = '';
    }else{
        alert('Todo input tidak boleh kosong!');
    }
};

function filterTodo(){
    console.log('hello')
}

// function filterTodo(e){
//     const value = e.target.value;
//     console.log(value)
// }
