function showNotification(message, type) {
  const notif = document.createElement("div");
  notif.innerText = message;
  notif.className = `notification ${type}`; 
  document.body.prepend(notif);
  
  // Remove the notification after 3 seconds
  setTimeout(() => {
      notif.remove();
  }, 3000);
}

function addnew() {
  const container = document.getElementById("temp");

  if (container.querySelector(".input-group")) {
      showNotification("Please save or cancel your current task first.", "error");
      return;
  }

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group";

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.placeholder = "Enter your task here...";
  taskInput.className = "task-input-field";

  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.className = "save-btn";
  
  saveButton.onclick = function() {
    if(taskInput.value.trim() !== ""){
        const tasklist = document.getElementById("tasklist");
        const taskGroup = document.createElement("div");
        taskGroup.className = "task-group";

        const taskText = document.createElement("p"); 
        taskText.innerText = taskInput.value;
        taskText.className = "task";

        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.className = "updt";
        const delButton = document.createElement("button");
        delButton.innerHTML = "Delete";
        delButton.className = "del";

        delButton.onclick = function() {
            taskGroup.remove();
            showNotification("Task deleted.", "success");
        };

        updateButton.onclick = function() {
            if(taskGroup.querySelector(".edit-wrapper")){
                return; 
            }
            const editWrapper = document.createElement("div");
            editWrapper.className = "edit-wrapper";

            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = taskText.innerText;
            editInput.className = "task-input-field";

            const confirmButton = document.createElement("button");
            confirmButton.innerText = "Confirm";
            confirmButton.className = "save-btn";

            confirmButton.onclick = function() {
                if (editInput.value.trim() !== "") {
                    taskText.innerText = editInput.value; 
                    editWrapper.remove();    
                    showNotification("Task updated successfully!", "success");        
                } else {
                    showNotification("Task description cannot be empty!", "error");
                }
            };

            editWrapper.appendChild(editInput);
            editWrapper.appendChild(confirmButton);
            taskGroup.appendChild(editWrapper);            
            editInput.focus();
        };

        taskGroup.appendChild(taskText);
        taskGroup.appendChild(updateButton);
        taskGroup.appendChild(delButton);
        tasklist.appendChild(taskGroup);
        inputGroup.remove();
        
        showNotification("Task added successfully!", "success");
    } 
    else{
      showNotification("What do you mean by an empty task?", "error");
    }
  };

  inputGroup.appendChild(taskInput);
  inputGroup.appendChild(saveButton);
  container.appendChild(inputGroup);
  
  taskInput.focus();
}