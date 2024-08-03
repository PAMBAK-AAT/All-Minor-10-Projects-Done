

const addBtn = document.getElementById('addBtn');
const inputBox = document.getElementById('inputBox');
const uList = document.getElementById('ulList');
 
let editTodo = null;

    /// Function to add a task in our ulist when add btn clicked.
const addTask = ()=>{

    let data = inputBox.value.trim();

    if(data.length<=0){
        alert("Please , enter something");
    }
    else{

        if(addBtn.value==="ADD"){

            // Creating a list tag and append a 'p tag'
            const list = document.createElement('li');
            const para = document.createElement('p');
            para.innerHTML = data;
            list.appendChild(para);

            // Create a edit btn.
            const editBtn = document.createElement('button');
            editBtn.innerText = "EDIT";
            editBtn.classList.add("btn" , "edit");
            list.appendChild(editBtn);

            // Create a Remove btn. 
            const remBtn = document.createElement('button');
            remBtn.innerText = "REMOVE";
            remBtn.classList.add("btn" , "delete");
            list.appendChild(remBtn);

            uList.appendChild(list);
            inputBox.value = "";

            /// Function to save our value in the local storage
            saveLocally(data);
        }

        else{
            editLocalTodos(data);// By this function we edit our data.
            editTodo.target.previousElementSibling.innerHTML = data;// By this we put data in our inputBox after editting.
            addBtn.value = "ADD";
            inputBox.value = "";
        }

    }
}

    /// Function to save our data to loocal storage
const saveLocally = (todo)=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));// By using JSON.parse we convert the JSON string into a JS array , so we can push our item in it...

    // It check if todos is not an array then we initialize it as an array.
        if (!Array.isArray(todos)) {
            todos = [];
        }
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

    /// Function to get the data from local storage whenever our window is loaded.
const getLocalTodos = ()=>{
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        if(!Array.isArray(todos)){
            todos = [];
        }
        todos.forEach(ele => {

            // Create a list and para
            const list = document.createElement('li');
            const para = document.createElement('p');
            para.innerHTML = ele;
            list.appendChild(para);

            // Create a Edit button
            const editBtn = document.createElement('button');
            editBtn.innerText = "EDIT";
            editBtn.classList.add("btn","edit");
            list.appendChild(editBtn);

            // Create a Remove Button
            const remBtn = document.createElement('button');
            remBtn.classList.add("btn","delete");
            remBtn.innerText = "REMOVE";
            list.appendChild(remBtn);

            uList.appendChild(list);
            inputBox.value = "";
        })
    }
}

    /// Function to do some changes (edit , delete) ...
const updateTodo = (ele)=>{
    if(ele.target.innerHTML==="REMOVE"){
        uList.removeChild(ele.target.parentElement);// that is 'li tag';
        // Now to delete it from local storage
        deleteLocalTodos(ele.target.parentElement);

    }
    else if(ele.target.innerHTML==="EDIT"){
        editTodo = ele;
        inputBox.value = ele.target.previousElementSibling.innerHTML;
        inputBox.focus();// This means that the cursor will be placed inside the input box, and the user can start typing immediately without needing to click on the input box first.
        addBtn.value = "EDIT";
    }
}

    /// Function to edit our data from local storage
    const editLocalTodos = (editedTodoValue) => {
        let todos;
        if(localStorage.getItem("todos")==null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
                // It uses localStorage.getItem("todos") to get the string representation of the todos stored under the key "todos", and JSON.parse to convert this string back into a JavaScript array.

/// Explanation --->>> 
                //uList.children gets a collection of all child elements of the <ul> element (presumably the list of todo items).
                // Array.from() is used to convert this collection into an array so that we can use array methods like indexOf.
                // indexOf(editTodo.target.parentElement) finds the index of the parent element of the clicked "Edit" button 

        let editedTodoIndex = Array.from(uList.children).indexOf(editTodo.target.parentElement);
        if (editedTodoIndex !== -1) {
            todos[editedTodoIndex] = editedTodoValue;
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }
    
    
    /// Function to delete our text from local storage
    const deleteLocalTodos = (ele)=>{
        let todos;
        if(localStorage.getItem("todos")==null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        let deletedTodoText = ele.children[0].innerHTML;
        let idx = todos.indexOf(deletedTodoText);

        todos.splice(idx,1);
        localStorage.setItem("todos",JSON.stringify(todos));
    }



document.addEventListener('DOMContentLoaded' , getLocalTodos);

addBtn.addEventListener('click' , addTask);

// here we choose ulist ,because it works on, --->>> Event Delegation: This is a common technique in JavaScript where instead of attaching event listeners to individual elements, you attach them to a parent element that contains all the elements you're interested in. This parent element then listens for events bubbling up from its children. 

uList.addEventListener('click' , updateTodo);


