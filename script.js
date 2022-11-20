
const notes = document.querySelector('.notes')
const formBtn = document.querySelector('.form-btn')
const submitItem = document.querySelector('.item-sub-btn')
const addProject = document.querySelector('.add-project')
const formItem = document.querySelector('.item-form-container')
const formProj = document.querySelector('.project-form-container')
const projectsAdded = ["dummy", "ipsum lorem", "foo bar"]

// function toggleForm(form) {
//     console.log("fired")
//     if (form.style.display === "block") {
//         form.style.display = "none";
//       } else {
//         form.style.display = "block";
//   }
// }
// formBtn.addEventListener('click', toggleForm.bind(formItem))
// addProject.addEventListener('click', toggleForm.bind(formProj))

function createProject(title) {
    return {
        title: title,
        tasks: [], 
    }
}


function projectInputToObject(e) {
    e.preventDefault();
    const output_info = document.querySelector(".project-form");
    const projectData = [...output_info.querySelectorAll("input:not([type=submit]), select")].map((item) => item.cloneNode(true));
    const newProject = createProject(projectData)
    projectsAdded.push(newProject)
}


createProject('misc')
createProject('dummy')

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
    createItem(data[0], data[1], data[2], value, selectProject)
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
            projectNames[i].text = projectsAdded[i]
            sel.appendChild(projectNames[i])
    }    
    
}





submitItem.addEventListener('click', itemInputToObject.bind(event))    


function createItem(title, description, dueDate, priority, project) {
    const task = createTask(title, description, dueDate, priority, project)
    if (project == "None") {
        misc.push(task) } 
    else {
        project.push(task)
    }
console.log("projects added" + projectsAdded)   

}



// const item = (title, description, dueDate, priority) => {
//     const title = () => title;
//     const description  = () => description;
//     const dueDate = () => dueDate;
//     let priority = () => priority;
    
//     }

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
        // getFullName() {
        //     return firstName + ' ' + lastName;
        //   },
        };
      }    