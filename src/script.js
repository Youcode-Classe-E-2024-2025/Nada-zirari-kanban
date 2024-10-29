
function addTask(sectionId) {
   
    const taskTitle = prompt("Entrez le titre de la tâche :");
    const taskDescription = prompt("Entrez la description de la tâche :");
    const taskDeadline = prompt("Entrez la date de délai de la tâche (YYYY-MM-DD) :");
    const taskStatus = prompt("Entrez le statut de la tâche (À faire, En cours, Terminé) :");
    const taskPriority = prompt("Entrez la priorité de la tâche (P1, P2, P3) :"); // Demande de priorité
  
    
    if (taskTitle) {
      
      const taskElement = createTaskElement(taskTitle, taskDescription, taskDeadline, taskStatus, taskPriority, sectionId);
      document.getElementById(`${sectionId}List`).appendChild(taskElement);
  
      // Mettre à jour le compteur si la tâche est ajoutée dans la section To Do
      if (sectionId === "todo") {
        updateTodoCount();
      }
    }
  }