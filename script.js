
const notes = document.querySelector('.notes')
const formBtn = document.querySelector('.form-btn')
const submitItem = document.querySelector('.item-sub-btn')
const submitProject = document.querySelector('.project-sub-btn')
const addProject = document.querySelector('.add-project')
const formItem = document.querySelector('.item-form-container')
const formProj = document.querySelector('.project-form-container')
const tasksHolder = document.querySelector('.tasks-holder')
const tasksAdded = []
const projectsAdded = []

function toggleItemForm() {

    if (formItem.style.display === "block") {
        formItem.style.display = "none";
      } else {
        formItem.style.display = "block";
  }
}

function toggleProjectForm() {

    if (formProj.style.display === "block") {
        formProj.style.display = "none";
      } else {
        formProj.style.display = "block";
  }
}
formBtn.addEventListener('click', toggleItemForm)
addProject.addEventListener('click', toggleProjectForm)

function createProject(title) {
    return {
        title: title,
        tasks: [], 
    }
}


function createItem(title, description, dueDate, priority, project) {
    const task = createTask(title, description, dueDate, priority, project)
    console.log("newly created task" + task.title)
    const projectSelected = projectsAdded.find(element => element.title == project)
    projectSelected.tasks.push(task)
    tasksAdded.push(task)
    buildTaskInterface() 

}

let counter = 0
function idGenerator() {
    counter += 1;
    return counter 
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
            console.log("shout")
            complete = true;
        }
        };
      }    

function projectInputToObject(e) {
    e.preventDefault();
    const output_info = document.querySelector(".project-form");
    const projectData = output_info.querySelector("input:not([type=submit]), select");
    console.log("project data", projectData.value)
    const newProject = createProject(projectData.value)
    projectsAdded.push(newProject)
    updateProjectSelect(newProject)
}

const misc = createProject('misc')

projectsAdded.push(misc)

//above dummy projects can be deleted later 

function itemInputToObject(e) {
    e.preventDefault();
    const output_info = document.querySelector(".item-form");
    const data = [...output_info.querySelectorAll("input:not([type=submit]), select")].map((item) => item.cloneNode(true));
    const x = document.getElementById("priority");
    const selectProject = document.querySelector('.select-project')
    const value = x.value;
    // const text = x.options[x.selectedIndex].text;
    createItem(data[0].value, data[1].value, data[2].value, value, selectProject.value)
}


const projects = document.querySelector('.optional-projects')    
const sel = document.createElement("select")
sel.classList.add("select-project")





//user interface 

function updateProjectSelect(project) { 
    if (projectsAdded.length > 0) { //maybe re-write this later so there is always a "none" project and the dropdown exists with 1 option 
        projects.textContent = "Add to project?"
        projects.appendChild(sel)
        let projectNames = []
    
        for (let i = 0; i < projectsAdded.length; i++) {
                projectNames[i] = document.createElement("option")
                projectNames[i].text = projectsAdded[i].title
                sel.appendChild(projectNames[i])
        }    
    }
     else 
        { projects.textContent = "No current projects to display" }
}

updateProjectSelect()
const innercont = document.createElement("div")

function displayTasks() {

    tasksAdded.forEach(element => console.log(element.title))

}
function displayProjects() {
    for (let i = 0; i < projectsAdded.length; i++) {
        innercont.text = " "
        const card = document.createElement('div');
        card.setAttribute('id', `card-${i}`) // assigns each card a unique id
        card.className = "card"
        const par1 = document.createElement("p")
        const par2 = document.createElement("p")  
        const projectTasks = projectsAdded[i].tasks.map(element => element.title)
        par1.innerText = "Tasks associated with project: " + projectTasks;
        par2.innerText = "Project Title: " + projectsAdded[i].title; 
        innercont.append(par1, par2) 
        notes.appendChild(innercont)
        console.log(tasksAdded)
      }
    }
     
function buildTaskInterface() {
    for (let i = 0; i < tasksAdded.length; i++) {
        console.log("function called")
        const taskCard = document.createElement('div')
        taskCard.setAttribute('id', tasksAdded[i].id)
        taskCard.setAttribute('class', 'task-card')

        const taskContainer = document.createElement("div")
        const par1 = document.createElement("p")
        const par2 = document.createElement("p")
        const par3 = document.createElement("p")
        const par4 = document.createElement("p");
        const par5 = document.createElement("p")

        par1.innerText = "Task title: " + tasksAdded[i].title;
        par2.innerText = "Description: " + tasksAdded[i].description;
        par3.innerText = "Priority: " + tasksAdded[i].priority;
        par5.innerText = "Due by: " + tasksAdded[i].dueDate;
        par4.setAttribute('id', `p-${i}`)
        taskContainer.append(par1, par2, par3, par4, par5) 

        const priorityButton = document.createElement("button");
        priorityButton.textContent = "change priority"

        if (tasksAdded[i].complete == true) {
            par4.innerText = "Completed" }
        else {
            par4.innerText = "Incomplete"
            const completeButton = document.createElement("button");
            completeButton.textContent = "Mark as Complete"
            completeButton.setAttribute('id', tasksAdded[i].id)
            completeButton.addEventListener('click', (e) => tasksAdded[i].markComplete(e))
            taskContainer.appendChild(completeButton)
    }
    notes.appendChild(taskContainer)
}
}




submitItem.addEventListener('click', itemInputToObject.bind(event))    
submitProject.addEventListener('click', projectInputToObject.bind(event))    



