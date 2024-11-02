// Ouvrir le modal

function ouvrirModal() {
document.getElementById("modal").classList.remove("hidden");
}

// Fermer le modal

function fermerModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden"); // Masquer le modal
  document.getElementById("taskForm").reset(); // Réinitialiser le formulaire

}

// Fermer le modal lorsque l'utilisateur clique en dehors

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
  event.preventDefault(); // Empêche le rechargement de la page

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const priority = document.querySelector('input[name="priority"]:checked').value; // Récupérer la priorité

  
  // Log les valeurs pour le débogage
  console.log("Titre :", title);
  console.log("Description :", description);
  console.log("Date :", date);
  console.log("Statut :", status);
  console.log("Priorité :", priority);

  // Creation du nouveau element
  const taskElement = createTaskElement(title, description, date, status, priority);
  
  // Ajouter la tâche à la section appropriée
  const column = document.getElementById(`${status}List`)
  console.log(status);
  console.log(column);
  
  column.appendChild(taskElement);

  // Fermer le modal
  fermerModal();

  // Mettre à jour le compteur de tâches
  updateTodoCount();
}

// Crée un élément de tâche visuelle
function createTaskElement(title, description, deadline, status, priority) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task", "p-2", "rounded", priorityClass(priority), "border", "border-gray-300", "hover:shadow-lg", "transition", "duration-200");

  
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
}