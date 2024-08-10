//const createRef = document.querySelectorAll(".create");
const createBtn = document.querySelector(".create");
const hiddenRef = document.querySelector(".new-task");
const titleRef = document.querySelector(".task-title");
const detailRef = document.querySelector(".task-detail");
const actionRef = document.querySelector('.new-task .action');
const addRef = document.querySelectorAll('section .catagory .add');

let targetPlace;

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

const tasks = [];

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
        console.log("task created!");
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

function createTask(){
    const idRef = Math.random();
    const contentRef = detailRef.value;
    const taskRef = document.createElement('div');
    taskRef.className = 'wrapper-task';
    taskRef.innerHTML = `
        <div class="id">ID: ${idRef}</div>
        <div class="title">Title: ${titleRef.value}</div>
        <div class="detail"> Details: ${contentRef}</div>
        <div class="delete">
            <i class="fa-solid fa-trash-can"></i>
        </div>
    `
    const taskareaRef = targetPlace.querySelector('.taskarea');
    taskareaRef.appendChild(taskRef);
    const deleteRef = taskRef.querySelector('.delete');
    deleteRef.addEventListener('click',(e) => {
        const selectedTaskRef = e.target.closest('.wrapper-task');
        console.log(selectedTaskRef);
        selectedTaskRef.classList.add('hide');
    });    
    titleRef.value = '';
    detailRef.value = ''; 
};