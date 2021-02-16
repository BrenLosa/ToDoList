//JavaScript code

//Elements
//creats constants for the elements
const clear= document.querySelector(".clear"); //botton clear
const dateElement= document.getElementById("date"); //Will show todays date
const list= document.getElementById("list"); //list where item is
const input= document.getElementById("input"); // to get what user types on the box

//Classes
const CHECK = "fa-check-circle"; //for botton check
const UNCHECK ="fa-circle-thin"; //for botton uncheck
const LINE_THROUGH= "lineThrough";//for line thorugh (when a task is completed)

//Variables
let LIST, id;

//Get item from Localstorage
let data = localStorage.getItem("TODO");

//Check if data is not empty
if(data){
    LIST= JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else{ //If data is not empty
    LIST = [];
    id = 0;
}

//Load items to the user's interface (Function)
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
//Clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Set date
const options = {month:"long", day: "numeric", year:"numeric"}; // : -> is
const today = new Date(); //today is an object set to new date
dateElement.innerHTML = today.toLocaleDateString("en-Us", options); //arguments (language, options)

//To do function

function addToDo(toDo, id , done, trash){
    if(trash){ return; } //if item is in the trash, it will prevent to keep executing code

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item= `<li class="item">
                 <i class="fa ${DONE} co " job="complete" id="${id}"></i> 
                <p class="text ${LINE}">${toDo}</p> 
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Add and item to the list by pressing enter key
document.addEventListener("keyup", function(even){ //wait for botton to be pressed
    if(event.keyCode == 13){ //if enter key is pressed
        const toDo = input.value;
        //check if the input is not empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id: id,
                done: false,
                trash: false
            });
            //Add item to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

//Complete to do Function
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove to do Function
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//Target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob =="complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }

    //Add item to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});