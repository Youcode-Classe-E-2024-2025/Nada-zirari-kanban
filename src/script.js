// Ouvrir le modal
function ouvrirModal() {
  console.log("ouvrirModal appelé");
  document.getElementById("modal").classList.remove("hidden");
}

function fermerModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden"); // Masquer le modal
  document.getElementById("taskForm").reset(); // Réinitialiser le formulaire
  console.log("Modal fermé"); // Ajoutez ceci pour voir si la fonction est appelée
}
