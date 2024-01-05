import './style.css'

// interface for Todo Data
interface Todo {
  title: string,
  isCompleted: boolean,
  readonly _id: string
}

// Todo data
const todos: Todo[] = [];


const todo_input =  document.getElementsByName('title')[0] as HTMLInputElement;
const todoContainer = document.querySelector('.todo_container') as HTMLDivElement;
const myForm = document.getElementById('todo_form') as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title:todo_input.value,
    isCompleted:false,
    _id:String(Math.random().toString(36)).substring(2)
  }
  todos.push(todo)
  todo_input.value = ''
  renderTodo(todos);

}

const generateTodoList = (title: string, isCompleted: boolean, _id: string)=> {

  // container
  const todo:HTMLDivElement =  document.createElement('div');
  todo.className = "todo"

  // Checkbox
  const checkbox:HTMLInputElement =  document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.className = 'isCompleted';
  checkbox.checked = isCompleted;

  checkbox.onchange = () => {
    todos.find((todo)=> {
      if(todo._id === _id) {
        todo.isCompleted = checkbox.checked
      }
    })
    para.className = checkbox.checked?'todo_completed':'';
  }

  // List item Title
  const para:HTMLParagraphElement = document.createElement('p');
  para.innerText = title;
  para.className = isCompleted ? 'todo_completed':''

  // action Button to remove
  const delete_btn =  document.createElement('button');
  delete_btn.innerText = 'X';
  delete_btn.className = "deleteBtn";
  delete_btn.onclick = () => {
   removeTodoItem(_id)
   if(!todos.length) {
    const empty:HTMLParagraphElement = document.createElement('p');
     empty.innerText = 'No Todo yet!'
     todoContainer.appendChild(empty)
     }
  }

  // Appending all element
  todo.append(checkbox, para, delete_btn)
  todoContainer.appendChild(todo)
}


const removeTodoItem = (id: string) => {
  const idx = todos.findIndex((item) => item._id == id)
  todos.splice(idx, 1);
  renderTodo(todos);
}
const renderTodo = (todos: Todo[]) => {
  todoContainer.innerHTML = ''
  todos.forEach((todo)=> {
    generateTodoList(todo.title, todo.isCompleted, todo._id)
  })
}