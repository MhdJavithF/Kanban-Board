//const createRef = document.querySelectorAll(".create");
const createBtn = document.querySelector(".create");
const hiddenRef = document.querySelector(".new-task");
const titleRef = document.querySelector(".task-title");
const detailRef = document.querySelector(".task-detail");
const actionRef = document.querySelector('.new-task .action');
const addRef = document.querySelectorAll('section .catagory .add');
const taskareaActionRef = document.querySelector('section');
const clearArrayRef = document.querySelector('.action .delete');
const searchRef = document.querySelector('.wrapper-head input');

let targetPlace;

window.alert('Please clear older cookies by clicking Delete icon!');

createBtn.addEventListener('click', function(e) {
    targetPlace = document;
    toggle();
}); 


addRef.forEach((add) =>{
    add.addEventListener('click', function(e) {
    targetPlace = e.target.parentElement;
    toggle();
    }); 
});

function toggle() {
    const isHidden = hiddenRef.classList.contains("hide");
    if(isHidden){
        hiddenRef.classList.remove("hide");
        console.log("visible");
    }
    else{
        hiddenRef.classList.add("hide");
        console.log("hidden");
    }
};

detailRef.addEventListener('keypress', function(e) {
    if(e.key == "Enter"){
        if(!titleRef.value){
            alert("Please enter title!");
            return;
        }
        else if(!detailRef.value){
            alert("Please enter task!");
            return;
        }
        createTask();
        console.log("Task created!");
        toggle();
    }
});

actionRef.addEventListener('click', (e) => {
    const crBtn = document.querySelector('.action button.create');
    const clBtn = document.querySelector('.action button.close');

    if (e.target === crBtn) {
        console.log("create Btn clicked!");
        if(!titleRef.value){
            alert("Please enter title!");
            return;
        }
        else if(!detailRef.value){
            alert("Please enter task!");
            return;
        }
        createTask();
        toggle();
    } else if (e.target === clBtn) {
        console.log("close Btn clicked!");
        titleRef.value = '';
        detailRef.value = ''; 
        hiddenRef.classList.add("hide");
    }
});

const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function addDataInStorage(newTask){
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateDataInStorage(updatedData, taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex !== -1) {
        const taskElement = tasks[taskIndex].element; // This is now the actual DOM element
        const detailTextarea = taskElement.querySelector('.detail textarea');
        if (detailTextarea) {
            detailTextarea.value = updatedData; // Update the textarea value in the DOM
        }

        // Optionally, update any other property if needed
        tasks[taskIndex].detail = updatedData;

        // Update localStorage after modifying the task
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks[taskIndex]);
    }
};

function deleteData(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        // console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};


clearArrayRef.addEventListener('click', (e) => {
    // console.log("Cleared array elements");
    tasks.splice(0,tasks.length);
    localStorage.clear();
    alert('Datas were cleared..!')
});

function createTask() {
    let idRef = Math.floor(Math.random() * 1000);
    const contentRef = detailRef.value;
    const taskRef = document.createElement('div');
    taskRef.className = 'wrapper-task';
    taskRef.dataset.id = idRef;
    taskRef.innerHTML = `
        <div class="id">ID: ${idRef}</div>
        <div class="title">Title: ${titleRef.value}</div>
        <div class="detail">
            Details: <br> <textarea>${contentRef}</textarea>
        </div>
        <div class="action">
            <div class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div class="delete">
                <i class="fa-solid fa-trash-can" data-id="${idRef}"></i>
            </div>
        </div>
    `;

    const taskareaRef = targetPlace.querySelector('.taskarea');
    const newTask = {
        id: idRef,
        title: titleRef.value,
        element: taskRef // Store the actual DOM element reference, not outerHTML
    };
    
    taskareaRef.appendChild(taskRef);
    addDataInStorage(newTask);

    const textareaRef = taskRef.querySelector('.detail textarea');
    textareaRef.addEventListener('change', (e) => {
        const updatedDetail = e.target.value;
        updateDataInStorage(updatedDetail, idRef);
    });

    // Clear input fields
    titleRef.value = '';
    detailRef.value = '';
};

taskareaActionRef.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
        const taskId = e.target.dataset.id;
        const currTaskRef = e.target.closest('.wrapper-task');
        if(currTaskRef){
            currTaskRef.remove();
        }
        deleteData(taskId);
    }

    else if(e.target.classList.contains('fa-pen-to-square')) {
        console.log("edit clicked");
        const currTaskRef = e.target.closest('.wrapper-task').querySelector('.detail');
        if (currTaskRef) {
            currTaskRef.classList.toggle('active');
            console.log(currTaskRef);
        }
    }
});

searchRef.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const taskElements = document.querySelectorAll('.wrapper-task');

    taskElements.forEach(task => {
        const taskId = task.querySelector('.id').textContent.split(':')[1].trim();
        const taskTitle = task.querySelector('.title').textContent.split(':')[1].trim().toLowerCase();
        
        if (taskId.includes(searchText) || taskTitle.includes(searchText)) {
            task.style.display = ''; // Show matching task
        } else {
            task.style.display = 'none'; // Hide non-matching task
        }
    });
});
