const listEl = document.getElementById('list');
const createBtnEl = document.getElementById('create');

let todos = []; // A global variable that will hold all our todos info

createBtnEl.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete:false
    }
    todos.unshift(item);

    const {itemEl, inputEl} = createTodoElement(item);

    listEl.prepend(itemEl);

    inputEl.removeAttribute("disabled");
    inputEl.focus();

    save();
};

{/* <div class="item">
<input type="checkbox" />
<input 
type="text" 
value="Todo content goes here" 
disabled />
<div class="actions">
    <button class="material-icons"><span class="material-symbols-outlined">edit</span></button>
    <button class="material-icons remove-btn"><span class="material-symbols-outlined">do_not_disturb_on</span></button>
</div>

</div> */}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add('complete');
    }
    // else {
    //     itemEl.classList.remove('complete');
    // }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "")

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');

    const editBtnElSpan = document.createElement('span');
    editBtnElSpan.classList.add('material-symbols-outlined');
    editBtnElSpan.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons')
    removeBtnEl.classList.add('remove-btn');

    const removeBtnElSpan = document.createElement('span');
    removeBtnElSpan.classList.add('material-symbols-outlined');
    removeBtnElSpan.innerText = 'do_not_disturb_on';

    editBtnEl.append(editBtnElSpan);
    removeBtnEl.append(removeBtnElSpan);
    actionsEl.append(editBtnEl, removeBtnEl);
    itemEl.append(checkbox, inputEl, actionsEl);

    //EVENTS
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        }else {
            itemEl.classList.remove('complete');
        }
        save();
    });

    inputEl.addEventListener("input", () => {
        item.text = inputEl.value;
    })

    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        save();
    });

    editBtnEl.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });

    removeBtnEl.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);

        itemEl.remove();
        save();
    });

    return {itemEl, inputEl, removeBtnEl, editBtnEl}
}

function displayTodos(){
    load();

    for (let i = 0; i < todos.length; i++){
        const item = todos[i];

        const { itemEl } = createTodoElement(item);

        listEl.append(itemEl);
    }
}

displayTodos();

function save() {
    // Save todos
    const save = JSON.stringify(todos);
    localStorage.setItem('myTodos', save);
}

function load(){
    const data = localStorage.getItem('myTodos');

    if (data){
        todos = JSON.parse(data);
    }
}