const listeProduits = document.querySelector("#listeProduits");
const ajouterBTN = document.querySelector("#ajouterBTN");
// Ajouter un événement de clic au bouton "Ajouter"
ajouterBTN.addEventListener("click", () => {
  // Récupérer les données du formulaire
  const formData = new FormData(formProduit);
  const produit = Object.fromEntries(formData);
  toTable(produit);
  formProduit.reset();
  toLocalStorage(produit);
});

const toLocalStorage = (produit) => {
  localStorage.setItem(produit.id, JSON.stringify(produit));
};

const toTable = (produit) => {
  // Créer une nouvelle ligne dans le tableau pour afficher le produit
  const tr = document.createElement("tr");
  // Ajouter les cellules pour l'id, le nom et le prix du produit
  const tdId = document.createElement("td");
  tdId.textContent = produit.id;
  const tdNom = document.createElement("td");
  tdNom.textContent = produit.nom;
  const tdPrix = document.createElement("td");
  tdPrix.textContent = produit.prix;
  // Ajouter les cellules à la ligne
  tr.appendChild(tdId);
  tr.appendChild(tdNom);
  tr.appendChild(tdPrix);
  // Ajouter une cellule pour le bouton de suppression
  const tdAction = document.createElement("td");
  const deleteIcon = document.createElement("img");
  deleteIcon.src =
    "https://files.softicons.com/download/toolbar-icons/vista-base-software-icons-2-by-icons-land/ico/DeleteRed.ico";
  deleteIcon.addEventListener("click", () => {
    listeProduits.removeChild(tr);
    localStorage.removeItem(produit.id);
  });
  tdAction.appendChild(deleteIcon);
  tr.appendChild(tdAction);
  listeProduits.appendChild(tr);
};
// Charger les produits depuis le localStorage lors du chargement de la page
window.addEventListener("load", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const produit = JSON.parse(localStorage.getItem(key));
    toTable(produit);
  }
});
