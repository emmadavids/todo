
//selecting various dom elements, assigning some buttons
const notes = document.querySelector('.notes')
const formBtn = document.querySelector('.form-btn')
const submitItem = document.querySelector('.item-sub-btn')
const submitProject = document.querySelector('.project-sub-btn')
const addProject = document.querySelector('.add-project')
const formItem = document.querySelector('.item-form-container')
const formProj = document.querySelector('.project-form-container')
const mainBit = document.querySelector('.main')
const tasksHolder = document.querySelector('.tasks-holder')
const sideBar = document.querySelector('.sidebar')
const showTasks = document.querySelector('.show-tasks')
const projects = document.querySelector('.optional-projects')    
const sel = document.createElement("select")
sel.classList.add("select-project")
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');


showTasks.addEventListener('click', buildTaskInterface)
submitItem.addEventListener('click', itemInputToObject.bind(event))    
submitProject.addEventListener('click', projectInputToObject.bind(event))    
formBtn.addEventListener('click', toggleItemForm)
addProject.addEventListener('click', toggleProjectForm)


const tasksAdded = []
const projectsAdded = [{title: "Misc", tasks: []} ]
const completedTasks = []


//classes 

function createProject(title) {
    return {
        title: title,
        tasks: [], 
    }
}

function createTask(title, description, dueDate, priority, project) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        project: project,
        complete: false,
        id: idGenerator(),
        markComplete() {
            this.complete = true;
        },
        changePriority(newPriority) {
            this.priority = newPriority;
        }
        };
      }    



// function to add unique ID to tasks

let counter = 0
function idGenerator() {
    counter += 1;
    return counter 
}


//functions to handle form data 

function projectInputToObject(e) {
    e.preventDefault();
    const output_info = document.querySelector(".project-form");
    const projectData = output_info.querySelector("input:not([type=submit]), select");
    if (projectData.value.trim() == "")
    {
        alert('please add a project title')
        return; 
    }
    const newProject = createProject(projectData.value)
    projectsAdded.push(newProject)
    updateProjectSelect(newProject)
    formProj.style.display = "none";
    listProjects(newProject)
    
}



function itemInputToObject(e) {
    e.preventDefault();
    const output_info = document.querySelector(".item-form");
    const data = [...output_info.querySelectorAll("input:not([type=submit]), select")].map((item) => item.cloneNode(true));
    const x = document.getElementById("priority");
    const selectProject = document.querySelector('.select-project')
    const value = x.value;
    if (data[0].value.trim() === '' || data[1].value.trim() == "" || data[2].value.trim() == "") {
        alert('please fill in all form values u dunderhead')
        return; 
    }
 
    createItem(data[0].value, data[1].value, data[2].value, value, selectProject.value)
    formItem.style.display = "none";
    const taskAdded = document.createElement("p")
    mainBit.appendChild(taskAdded) 
    
}


function createItem(title, description, dueDate, priority, project) {
    const task = createTask(title, description, dueDate, priority, project)
    console.log("newly created task" + task.title)
    const projectSelected = projectsAdded.find(element => element.title == project)
    projectSelected.tasks.push(task)
    tasksAdded.push(task)
    buildTaskInterface() 

}

//UI

function toggleItemForm() {
    notes.innerText = " "
    tasksHolder.style.display = " "
    
    if (formItem.style.display === "block") {
        formItem.style.display = "none";
      } else {
        formItem.style.display = "block";
        formProj.style.display = "none";
  }
}

function toggleProjectForm() {

    if (formProj.style.display === "block") {
        formProj.style.display = "none";
      } else {
        formProj.style.display = "block";
        formItem.style.display = "none";
  }
}


function listProjects(element) {
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "project-list-item");
    listItem.innerText = element.title;
    sideBar.append(listItem);
  
    // Create a div to hold the task list
    const taskListDiv = document.createElement("div");
  
    // When the list item is clicked, find all tasks associated with the project and append them to taskListDiv
    listItem.addEventListener("click", () => {
      const tasks = element.tasks;
  
      // Clear the taskListDiv
      taskListDiv.innerHTML = "";
  
      if (tasks.length === 0) {
        const taskItem = document.createElement("p");
        taskItem.innerText = "No tasks associated with this project to display";
        taskListDiv.appendChild(taskItem);
      } else {
        const taskList = document.createElement("ul");
        tasks.forEach((task) => {
            const taskContainer = buildTaskInterface(task);
            taskList.appendChild(taskContainer);
          });
    
  
        taskListDiv.appendChild(taskList);
      }
  
      // Clear the mainBit div and add the taskListDiv to it
      notes.innerHTML = "";
      notes.appendChild(taskListDiv);
    });
  }

listProjects(projectsAdded[0])


function updateProjectSelect() { 
    
        projects.textContent = "Add to project?"
        projects.appendChild(sel)
        let projectNames = []
    
        for (let i = 0; i < projectsAdded.length; i++) {
                projectNames[i] = document.createElement("option")
                projectNames[i].text = projectsAdded[i].title
                sel.appendChild(projectNames[i])
        }    
  
}


updateProjectSelect()


function buildTaskInterface(project) {
    notes.innerHTML = "";
  
    let tasksToDisplay = tasksAdded;
  
    if (project) {
      tasksToDisplay = tasksAdded.filter(task => task.project === project.title);
    }
  
    if (tasksToDisplay.length === 0) {
      notes.innerText = "No Tasks to display"
    }
    else {
      for (let i = 0; i < tasksToDisplay.length; i++) {

        console.log("function called")
        const taskContainer = document.createElement("div")
        taskContainer.setAttribute('id', tasksToDisplay[i].id)
        taskContainer.setAttribute('class', 'rainbow-box')
        const par1 = document.createElement("h3")
        const par2 = document.createElement("p")
        const par3 = document.createElement("p")
        const par4 = document.createElement("p");
        const par5 = document.createElement("p")
        par1.insertAdjacentHTML('afterbegin', '<b><u>' + tasksToDisplay[i].title + '</b></u>');
        par2.innerText = tasksToDisplay[i].description;
        par2.setAttribute('class', 'description-box')
        par3.innerText = "Priority: " + tasksToDisplay[i].priority;
     
        par3.setAttribute('class', `pr-${tasksToDisplay[i].id}`)
        par5.innerText = "Due: " + tasksToDisplay[i].dueDate;
        par4.setAttribute('id', `p-${tasksToDisplay[i].id}`)
        const priorityButton = document.createElement("button");

        priorityButton.classList.add('priority-btn', `pr-${tasksToDisplay[i].id}`);
        priorityButton.textContent = "change priority"
        priorityButton.addEventListener('click', function() { changePriorityUI(tasksToDisplay[i], taskContainer, par3, priorityButton) 
        priorityButton.style.display = "none" } )
     
        taskContainer.append(par1, par2, par3, priorityButton, par4, par5) 
  
        par4.innerText = "Incomplete"
        const completeButton = document.createElement("button");
        completeButton.textContent = "Mark Complete"
        completeButton.setAttribute('class', 'complete')

        completeButton.setAttribute('id', tasksToDisplay[i].id)
        completeButton.addEventListener('click', (e) => {
            tasksToDisplay[i].markComplete(e)
            // par4.innerText = "Completed"
            // completeButton.remove()
            completedTasks.push(tasksToDisplay[i])
            taskContainer.remove()
          })
        //   taskContainer.appendChild(completeButton)
          taskContainer.append(par1, par2, par3, priorityButton, par4, completeButton, par5) 
    
        notes.appendChild(taskContainer)
      }
    }
  }


  function changePriorityUI(task, taskContainer, par3, priorityButton) {
    console.log("task id", task.id)
    const priorities = ["Low", "Medium", "High"];

    const select = document.createElement("select");
    for (const priority of priorities) {
        let option = document.createElement("option");
        option.setAttribute('value', priority);
        option.textContent = priority;
        select.append(option)
    }

    select.addEventListener("change", (event) => {
        task.changePriority(event.target.value);
        console.log("event target " + event.target)
        par3.textContent = "Priority: " + event.target.value
        priorityElements.forEach(element => {
            element.style.display = "block";
        });
        select.style.display = "none";
        priorityButton.style.display = "block";
    });

    taskContainer.insertBefore(select, priorityButton.nextSibling);

    const priorityElements = document.querySelectorAll(`.pr-${task.id}`);
    priorityElements.forEach(element => {
        element.style.display = "none";
    });

    select.style.display = "block";
    priorityButton.style.display = "none";
}
  
  
  
  
  


//ways this code could be improved: 
// 1. one function that toggles between different form views, taking a selected dom element as a parameter 
// 2. separating the build task UI function out into one that builds an individual card and a function that filters out tasks as necessary (the former could call the latter)
// 3. the complete button in the build task ui function could be its own function probably. 
// 4. create a module for handling project-related functions, another for handling task-related functions, and another for handling user-related functions.
// 5. think in advance what parts of the UI will need to be toggled and untoggled, sketch these out 
