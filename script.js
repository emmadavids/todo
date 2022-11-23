
const notes = document.querySelector('.notes')
const formBtn = document.querySelector('.form-btn')
const submitItem = document.querySelector('.item-sub-btn')
const submitProject = document.querySelector('.project-sub-btn')
const addProject = document.querySelector('.add-project')
const formItem = document.querySelector('.item-form-container')
const formProj = document.querySelector('.project-form-container')
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
    if (project == "None") {
        misc.push(task) } 
    else {
        const projectSelected = projectsAdded.find(element => element.title == project.value)
        projectSelected.tasks.push(task)
    }
console.log("projects added" + projectsAdded)   


}

function createTask(title, description, dueDate, priority, project) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        project: project,
        complete: false,
        markComplete() {
            complete = true;
        }
    
        };
      }    



function projectInputToObject(e) {
    e.preventDefault();
    console.log("project input button pressed")
    const output_info = document.querySelector(".project-form");
    const projectData = [...output_info.querySelectorAll("input:not([type=submit]), select")].map((item) => item.cloneNode(true));
    const newProject = createProject(projectData)
    projectsAdded.push(newProject)
    console.log(projectsAdded)
}


const misc = createProject('misc')
const dummy = createProject('dummy')
projectsAdded.push(dummy)
projectsAdded.push(misc)

//above dummy projects can be deleted later 

// function addProject(title) {
//     const project = project(title)
//     projects.push(project)
// }

function itemInputToObject(e) {
    e.preventDefault();
    const output_info = document.querySelector(".item-form");
    const data = [...output_info.querySelectorAll("input:not([type=submit]), select")].map((item) => item.cloneNode(true));
    const x = document.getElementById("priority");
    const selectProject = document.querySelector('.select-project')
    const value = x.value;
    const text = x.options[x.selectedIndex].text;
    console.log(value, text);
    const item = createItem(data[0], data[1], data[2], value, selectProject)
    tasksAdded.push(item)
    displayProjects()

}

   
//user interface 
if (projectsAdded.length > 0) {
    const projects = document.querySelector('.optional-projects')
    projects.textContent = "Add to project?"
    const sel = document.createElement("select")
    sel.classList.add("select-project")
    const opt = document.createElement("option")
    opt.text = "None"
    sel.appendChild(opt)
    projects.appendChild(sel)
    let projectNames = []
        for (let i = 0; i < projectsAdded.length; i++) {
          
            projectNames[i] = document.createElement("option")
            projectNames[i].text = projectsAdded[i].title
            sel.appendChild(projectNames[i])
    }    
    
}

function displayProjects() {
    for (let i = 0; i < projectsAdded.length; i++) {
    
        const card = document.createElement('div');
        card.setAttribute('id', `card-${i}`) // assigns each card a unique id
        card.className = "card"
        const innercont = document.createElement("div")
        const par1 = document.createElement("p")
        const par2 = document.createElement("p")  
        par1.innerText = "Tasks associated with project: " + projectsAdded[i].tasks[0];
        par2.innerText = "Poject Title: " + projectsAdded[i].title; 
        innercont.append(par1, par2) 
        notes.appendChild(innercont)
      }
    }
     





submitItem.addEventListener('click', itemInputToObject.bind(event))    
submitProject.addEventListener('click', projectInputToObject.bind(event))    



