// Ouvrir le modal

function ouvrirModal() {
document.getElementById("modal").classList.remove("hidden");
}

// Fermer le modal

function fermerModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden"); // hiddé le modal
  document.getElementById("taskForm").reset(); // Réinitialise le formulaire

}

// Fermer le modal lorsque l'utilisateur clik en dehors

window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    fermerModal();
  }
};


// Ajouter un écouteur d'événements pour le formulaire
document.getElementById("taskForm").addEventListener("submit", ajouterTache);

// Fonction pour ajouter une nouvelle tâche
function ajouterTache(event) {
  event.preventDefault(); // interdit recharge de la page

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const priority = document.querySelector('input[name="priority"]:checked').value; // avoir la priorité

  // Crée  nouvel élément de tâche
  const taskElement = createTaskElement(title, description, date, status, priority);

  // Ajouter la tâche à sa propr section 
  const column = document.getElementById(`${status}List`);
  column.appendChild(taskElement);

  // Animation dajouut
  setTimeout(() => {
      taskElement.classList.remove("opacity-0"); // supprim l'opacité
      taskElement.classList.add("opacity-100"); // Ajoute l'opacité 
  }, 120); //duree de animation

  // Fermer le modal
  fermerModal();

  // Mettre à jour le compteur
  updateTodoCount();
}

// Crée un élément de tâche 
function createTaskElement(title, description, deadline, status, priority) {
  const taskElement = document.createElement("div");
 
  taskElement.classList.add("task", "p-2", "rounded", priorityClass(priority), "border", "border-gray-300", "hover:shadow-lg", "transition", "duration-200", "opacity-0"); // Ajout d'opacité initiale
  
 // Afficher ule titre de la tache
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  titleElement.classList.add("font-semibold", "text-lg");
  taskElement.appendChild(titleElement);

  // Afficher une indication de priorité
  const priorityElement = document.createElement("p");
  priorityElement.textContent = `Priorité: ${priority}`;
  taskElement.appendChild(priorityElement);
 
 
  // Ajouter un bouton pour supprimer la tâche
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  deleteButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-red-600", "ml-2" ,"mt-2");
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement pour ne pas ouvrir les détails
    taskElement.remove(); // Supprime l'élément de tâche
    updateTodoCount(); // Met à jour le compteur après suppression
  });
  taskElement.appendChild(deleteButton);

  // Ajouter des boutons pour déplacer la tâche
  // if (status === 'todo') {
  //   const inProgressButton = document.createElement("button");
  //   inProgressButton.textContent = "Déplacer à In progreess";
  //   inProgressButton.classList.add("bg-green-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-yellow-600","mt-3" ,"ml-2");
  //   inProgressButton.addEventListener("click", (event) => {
  //     event.stopPropagation(); // Empêche la propagation de l'événement pour ne pas ouvrir les détail²s
  //     document.getElementById("inProgressList").appendChild(taskElement); // Déplace la tâche vers la liste "En cours"
  //     status = "doing"; // Met à jour le statut
  //     updateTodoCount(); // Met à jour le compteur
  //     const Button = document.createElement("button");
  //     Button.textContent = "Déplacer done";
  //     Button.classList.add("bg-green-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-yellow-600","mt-3" ,"ml-2");
  //   });
  //   taskElement.appendChild(inProgressButton);


    // Ajouter des boutons pour déplacer la tâche
  if (status === 'todo') {
    const inProgressButton = document.createElement("button");
    inProgressButton.textContent = "Déplacer à In progress";
    inProgressButton.classList.add("bg-green-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-yellow-600", "mt-3", "ml-2");
    
    inProgressButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Empêche la propagation de l'événement pour ne pas ouvrir les détails

        // Déplace la tâche vers la liste "En cours"
        document.getElementById("inProgressList").appendChild(taskElement);
        status = "doing"; // Met à jour le statut
        updateTodoCount(); // Met à jour le compteur

        // Supprime le bouton "Déplacer à In progress"
        inProgressButton.remove();

        // Crée et ajoute le bouton "Déplacer en Done"
        const doneButton = document.createElement("button");
        doneButton.textContent = "Déplacer en Done";
        doneButton.classList.add("bg-green-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-yellow-600", "mt-3", "ml-2");

        doneButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Empêche la propagation de l'événement

            // Déplace la tâche vers la liste "Done"
            document.getElementById("doneList").appendChild(taskElement);
            status = "done"; // Met à jour le statut
            updateTodoCount(); // Met à jour le compteur

            // Supprime le bouton "Déplacer en Done" après déplacement
            doneButton.remove();
        });

        taskElement.appendChild(doneButton); // Ajoute le bouton "Déplacer en Done" à l'élément de tâche
    });

    taskElement.appendChild(inProgressButton); // Ajoute le bouton "Déplacer à In progress" à l'élément de tâche

  } else if (status === 'inProgress') {
    const doneButton = document.createElement("button");
    doneButton.textContent = "Déplacer à doonee";
    doneButton.classList.add("bg-green-500", "text-white", "px-2", "py-1", "rounded", "hover:bg-green-600", "ml-2");
    doneButton.addEventListener("click", (event) => {
      event.stopPropagation(); // il stop le événement pour ne pas ouvrir les détails
      document.getElementById("doneList").appendChild(taskElement); // Déplace la tâche vers la liste "Terminé"
      status = "done"; // Met à jour le statut
      updateTodoCount(); // Met à jour le compteur de tache
    });
    taskElement.appendChild(doneButton);
  }

  return taskElement;
}

//  priorité en couleur
function priorityClass(priority) {
  switch (priority) {
    case "P1": return "bg-red-200";
    case "P2": return "bg-yellow-200";
    case "P3": return "bg-green-200";
    default: return "bg-gray-200";
  }
}

// Affiche les détails de la tâche
function displayTaskDetails(title, description, deadline, status) {
  const taskDetails = document.getElementById("taskDetails");
  const taskDetailText = document.getElementById("taskDetailText");

  taskDetailText.innerHTML = `
    <strong>Titre :</strong> ${title}<br>
    <strong>Description :</strong> ${description || "Aucune description"}<br>
    <strong>Date de délai :</strong> ${deadline || "Aucune date de délai"}<br>
    <strong>Statut :</strong> ${status || "Aucun statut"}
  `;

  taskDetails.classList.remove("hidden");
}

// Met à jour le compteur
function updateTodoCount() {
  const todoCount = document.getElementById("todoCount");
  const todoList = document.getElementById("todoList");
  todoCount.textContent = todoList.children.length; //  nombre dans  Todo

  const inProgressCount = document.getElementById("inProgressCount");
  const inProgressList = document.getElementById("inProgressList");
  inProgressCount.textContent = inProgressList.children.length; // nombre dans In Progress

  const doneCount = document.getElementById("doneCount");
  const doneList = document.getElementById("doneList");
  doneCount.textContent = doneList.children.length; //nombre dans  Done
}


  
