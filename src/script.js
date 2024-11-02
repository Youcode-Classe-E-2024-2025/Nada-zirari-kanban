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
