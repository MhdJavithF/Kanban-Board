//const createRef = document.querySelectorAll(".create");
const createBtn = document.querySelector(".create");
const hiddenRef = document.querySelector(".new-task");
const titleRef = document.querySelector(".task-title");
const detailRef = document.querySelector(".task-detail");
const actionRef = document.querySelector('.new-task .action');
const addRef = document.querySelectorAll('section .catagory .add');
const taskareaDelRef = document.querySelector('section');
const clearArrayRef = document.querySelector('.action .delete');

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

clearArrayRef.addEventListener('click', (e) => {
    // console.log("Cleared array elements");
    tasks.splice(0,tasks.length);
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
        <div class="detail">Details: ${contentRef}</div>
        <div class="delete">
            <i class="fa-solid fa-trash-can" data-id="${idRef}"></i> <!-- Store the ID in the trash icon -->
        </div>
    `;

    const taskareaRef = targetPlace.querySelector('.taskarea');
    const newTask = {
                        id: idRef,
                        element: taskRef.outerHTML 
                    };                      // Store the task object in the array
        
    taskareaRef.appendChild(taskRef);

    addDataInStorage(newTask);

    // Clear input fields
    titleRef.value = '';
    detailRef.value = '';

    // console.log(tasks);
}

function deleteData(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        // console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

taskareaDelRef.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-can')) {
        const taskId = e.target.dataset.id;
        const currTaskRef = e.target.closest('.wrapper-task');
        if(currTaskRef){
            currTaskRef.remove();
        }
        deleteData(taskId);
    }
});