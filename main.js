//const createRef = document.querySelectorAll(".create");
const createBtn = document.querySelector(".create");
const hiddenRef = document.querySelector(".new-task");
const titleRef = document.querySelector(".task-title");
const detailRef = document.querySelector(".task-detail");
const actionRef = document.querySelector('.new-task .action');
const addRef = document.querySelectorAll('section .catagory .add');
const taskareaRef = document.querySelector('.taskarea');

createBtn.addEventListener('click', function(e) {
    toggle();
}); 

addRef.forEach((add) =>{
    add.addEventListener('click', function(e) {
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
        toggle();
    } else if (e.target === clBtn) {
        console.log("close Btn clicked!");
        hiddenRef.classList.add("hide");
    }
});

function createTask(){
    const taskRef = document.createElement('div');
    taskRef.className = 'wrapper-task';
    taskRef.innerHTML = `
        <div class="id">ID</div>
        <div class="title">Title</div>
        <div class="detail">Details</div>
    `
    taskareaRef.appendChild(taskRef);
};