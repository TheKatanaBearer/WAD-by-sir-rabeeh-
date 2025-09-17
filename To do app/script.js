const inputBox = document.getElementById("input-box");
const list_container = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must right something!")

    }

    else{
        let li=document.createElement("li");
        li.innerHTML= inputBox.value;
        list_container.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value="";
}


list_container.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        
    }

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        
    }
}, false);

function saveData(){
    localStorage.setItem("data", list_container.innerHTML);
}

function showTask(){
    list_container.innerHTML = localStorage.getItem("data");
    
}

showTask();