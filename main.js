// Get references to the HTML elements
const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const priorityInput = document.getElementById('priority-input');
const statusInput = document.getElementById('status-input');
const todoTable = document.getElementById('todo-table');
const todoCountTable = document.getElementById('todoCount');

// Function to create a new row in the table
function createRow(task, dueDate, priority, status) {
 const row = document.createElement('tr');
 const taskCell = document.createElement('td');
 const dueDateCell = document.createElement('td');
 const priorityCell = document.createElement('td');
 const statusCell = document.createElement('td');
 const actionCell = document.createElement('td');

 taskCell.textContent = task;
 dueDateCell.textContent = dueDate;
 priorityCell.textContent = priority;
 statusCell.textContent = status;

 // Create an "Edit" button and a "Delete" button
 const editBtn = document.createElement('button');
 editBtn.textContent = 'Edit';
 const deleteBtn = document.createElement('button');
 deleteBtn.textContent = 'Delete';

 actionCell.appendChild(editBtn);
 actionCell.appendChild(deleteBtn);

 row.appendChild(taskCell);
 row.appendChild(dueDateCell);
 row.appendChild(priorityCell);
 row.appendChild(statusCell);
 row.appendChild(actionCell);

 return row;
}

// Add an event listener to the "Add" button
addBtn.addEventListener('click', () => {
 // Create a new row and add it to the table
 const row = createRow(taskInput.value, dueDateInput.value, priorityInput.value, statusInput.value);
 todoTable.tBodies[0].appendChild(row);

 // Reset the input fields
 taskInput.value = '';
 dueDateInput.value = '';
 priorityInput.value = 'high';
 statusInput.value = 'To-do';

 // Update the todo count
 updateTodoCount();
});

// Function to update the todo count
function updateTodoCount() {
 const rowCount = todoTable.tBodies[0].rows.length;
 const totalTasks = rowCount;
 let pendingTasks = 0;
 let completedTasks = 0;

 // Update the todo count table
 todoCountTable.tBodies[0].innerHTML = `<tr><td>Total: ${totalTasks}</td></tr>`;

 // Update the pending and completed tasks count
 for (let i = 0; i < rowCount; i++) {
   const statusCell = todoTable.tBodies[0].rows[i].cells[3].textContent;
   if (statusCell === 'To-do' || statusCell === 'In Progress') {
     pendingTasks++;
   } else if (statusCell === 'Done') {
     completedTasks++;
   }
 }

 todoCountTable.tBodies[0].innerHTML += `<tr><td>Pending: ${pendingTasks}</td></tr>`;
 todoCountTable.tBodies[0].innerHTML += `<tr><td>Completed: ${completedTasks}</td></tr>`;
}

// Function to handle edit and delete actions
todoTable.addEventListener('click', (event) => {
    const target = event.target;
  
    // Check if the clicked element is a button within the table
    if (target.tagName.toLowerCase() === 'button') {
      const row = target.closest('tr');
  
      if (target.textContent === 'Edit') {
        // Populate the input fields with existing values for editing
        taskInput.value = row.cells[0].textContent;
        dueDateInput.value = row.cells[1].textContent;
        priorityInput.value = row.cells[2].textContent;
        statusInput.value = row.cells[3].textContent;
  
        // Remove the existing row from the table
        row.remove();
  
        // Update the todo count after deletion
        updateTodoCount();
      } else if (target.textContent === 'Delete') {
        // Remove the row from the table
        row.remove();
  
        // Update the todo count after deletion
        updateTodoCount();
      }
    }
});
