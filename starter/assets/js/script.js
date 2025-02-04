let formSubmission = document.getElementById('form-task');
let toDoTasks = document.getElementById('to-do-tasks');
let inProgressTasks = document.getElementById('in-progress-tasks');
let doneTasks = document.getElementById('done-tasks');
let todoTaskCount = document.getElementById('to-do-tasks-count');
let inProgressCount = document.getElementById('in-progress-tasks-count');
let doneCount = document.getElementById('done-tasks-count');
let titleError = document.getElementById('title-error');
let typeError = document.getElementById('type-error');
let priorityError = document.getElementById('Priority-error');
let statusError = document.getElementById('status-error');
let DateError = document.getElementById('date-error');
let descriptionError = document.getElementById('description-error');
// const TaskModalDelete = getElementById('modal-task');

let editingTaskId = null; // Variable to track the task being edited

// Show the modal when the "Add Task" button is clicked
document.getElementById("add-task").addEventListener('click', function () {
    editingTaskId = null; // Reset editing ID
    formSubmission.reset(); // Clear the form
    const modal = new bootstrap.Modal(document.getElementById('modal-task'));
    modal.show();
   
});

// add to do function
function createElement(taskId, taskTitle, taskType, taskPriority, taskDate, taskDescription, taskStatus) {
  if('To Do'){
   return ` 
     <div class="list-group-item" id="${taskId}" data-status="${taskStatus}">
        <h3 class="btn-warning text-dark display-6 task-title">${taskTitle}</h3>
        <p class="task-type">Type: ${taskType}</p>
        <p class="task-priority">Priority: ${taskPriority}</p>
        <p class="task-date">Date: ${taskDate}</p>
        <p class="task-description">Description: ${taskDescription}</p>
        <button class="btn btn-warning btn-sm" onclick="editTask('${taskId}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${taskId}')">Delete</button>
     </div>
   `;
  }else if('In Progress'){
    return `
    <div class="list-group-item" id="${taskId}" data-status="${taskStatus}">
        <h3 class="btn-primary text-dark display-6 task-title">${taskTitle}</h3>
        <p class="task-type">Type: ${taskType}</p>
        <p class="task-priority">Priority: ${taskPriority}</p>
        <p class="task-date">Date: ${taskDate}</p>
        <p class="task-description">Description: ${taskDescription}</p>
        <button class="btn btn-warning btn-sm" onclick="editTask('${taskId}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${taskId}')">Delete</button>
    </div>
   `;
  }else{
    return `
    <div class="list-group-item" id="${taskId}" data-status="${taskStatus}">
        <h3 class="btn-success text-dark display-6 task-title">${taskTitle}</h3>
        <p class="task-type">Type: ${taskType}</p>
        <p class="task-priority">Priority: ${taskPriority}</p>
        <p class="task-date">Date: ${taskDate}</p>
        <p class="task-description">Description: ${taskDescription}</p>
        <button class="btn btn-warning btn-sm" onclick="editTask('${taskId}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask('${taskId}')">Delete</button>
    </div>
  `;
  }
 
}


//function to delete warinig message
let warningTextErase = () => {
  titleError.style.display = "none";
  typeError.style.display = "none";
  priorityError.style.display = "none";
  DateError.style.display = "none";
  descriptionError.style.display = "none";
  statusError.style.display = "none";
};

//function to display warinig message
  function warningTextDisplay(warningValue){
  warningValue.textContent = "Please Fill in This Field!";
  warningValue.style.color = "red";
  warningValue.style.fontFamily = "sans-serif";
  warningValue.style.fontSize = "bold"; 
  warningValue.style.fontWeight = "bold";
};


// Event listener for form submission
formSubmission.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    var taskTitle = document.getElementById('task-title').value.trim();
    var taskType = document.querySelector('input[name="task-type"]:checked').value ;
    var taskPriority = document.getElementById('task-priority').value;
    var taskDate = document.getElementById('task-date').value;
    var taskDescription = document.getElementById('task-description').value.trim();
    var taskStatus = document.getElementById('task-status').value;
    
    if (taskTitle === '' || taskType === ''|| taskPriority === ''|| taskDate === '' || taskDescription === '' || taskStatus === ''){
            if (taskTitle === '') {
              titleError.textContent = "Please Fill in This Field!";
              titleError.style.color = "red";
              titleError.style.fontFamily = "sans-serif";
              titleError.style.fontSize = "bold"; 
              titleError.style.fontWeight = "bold";
            }
            if (taskType === '') {
              warningTextDisplay(typeError);
            }
            if (taskPriority === '') {
              warningTextDisplay(priorityError);
            }
            if (taskDate === '') {
              warningTextDisplay(DateError);
            }
            if (taskDescription === '') {
              warningTextDisplay(descriptionError);
            }
            if (taskStatus === '') {
              warningTextDisplay(statusError);
            }
          
          return; // Stop the function if validation fails
    }

    if (editingTaskId) {
        // Update existing task
        const taskElement = document.getElementById(editingTaskId);
        taskElement.querySelector('.task-title').textContent = taskTitle;
        taskElement.querySelector('.task-type').textContent = `Type: ${taskType}`;
        taskElement.querySelector('.task-priority').textContent = `Priority: ${taskPriority}`;
        taskElement.querySelector('.task-date').textContent = `Date: ${taskDate}`;
        taskElement.querySelector('.task-description').textContent =`Description: ${taskDescription}`;
        if(taskStatus === 'To Do'){
          taskElement.dataset.status = taskStatus;
          editingTaskId = null; // Reset editing ID
        }if(taskStatus === 'In Progress'){
          taskElement.dataset.status = taskStatus;
          editingTaskId = null; // Reset editing ID
        }if(taskStatus === 'Done'){
          taskElement.dataset.status = taskStatus;
          editingTaskId = null; // Reset editing ID
        }
      
    } else {
        // Create a new task
        const newTaskId = 'task-' + Date.now();
        
        if (taskStatus === 'To Do') {
          const taskHTML = createElement(newTaskId, taskTitle, taskType, taskPriority, taskDate, taskDescription, taskStatus);
            toDoTasks.innerHTML += taskHTML; // Append to To Do list
        } else if (taskStatus === 'In Progress') {
          const taskHTML = createElement(newTaskId, taskTitle, taskType, taskPriority, taskDate, taskDescription, taskStatus);
            inProgressTasks.innerHTML += taskHTML; // Append to In Progress list
        } else if (taskStatus === 'Done') {
          const taskHTML = createElement(newTaskId, taskTitle, taskType, taskPriority, taskDate, taskDescription, taskStatus);
            doneTasks.innerHTML += taskHTML; // Append to Done list
        }     
    }

    // Clear the form after submission
    formSubmission.reset();
    warningTextErase();
    updateTaskCount(); // Update task counts

    const modal = bootstrap.Modal.getInstance(document.getElementById('modal-task'));
    modal.hide(); // Hide the modal after form submission
   
});

// Function to edit a task
function editTask(taskId) {
    const taskElement = document.getElementById(taskId);
    document.getElementById('task-title').value = taskElement.querySelector('.task-title').textContent;
    document.querySelector(`input[name="task-type"][value="${taskElement.querySelector('.task-type').textContent.split(': ')[1]}"]`).checked = true;
    document.getElementById('task-priority').value = taskElement.querySelector('.task-priority').textContent.split(': ')[1];
    document.getElementById('task-date').value = taskElement.querySelector('.task-date').textContent.split(': ')[1];
    document.getElementById('task-description').value = taskElement.querySelector('.task-description').textContent.split(': ')[1];
    document.getElementById('task-status').value = taskElement.dataset.status;

    editingTaskId = taskId; // Set the editing task ID
    const modal = new bootstrap.Modal(document.getElementById('modal-task'));
    modal.show(); // Show the modal
}

// Function to delete a task
function deleteTask(taskId) {
  const modalDelete = document.getElementById('modal-delete');
  const modal = new bootstrap.Modal(modalDelete);
  modal.show();

  // Store the task ID in a data attribute for later use
  modalDelete.setAttribute('data-task-id', taskId);

  // Add event listener for the delete confirmation button
  document.getElementById('modal-delete').addEventListener('click', function (event) {
      if (event.target.id === 'task-save-btn') {
          const taskId = modalDelete.getAttribute('data-task-id');
          const taskElement = document.getElementById(taskId);
          if (taskElement) {
              taskElement.parentNode.removeChild(taskElement);
              updateTaskCount();
          }
          const modal = bootstrap.Modal.getInstance(modalDelete);
          modal.hide();
      }
  });
}

// Function to update task count
function updateTaskCount() {
    todoTaskCount.textContent = toDoTasks.childElementCount; // Count To Do tasks
    inProgressCount.textContent = inProgressTasks.childElementCount; // Count In Progress tasks
    doneCount.textContent = doneTasks.childElementCount; // Count Done tasks
}
