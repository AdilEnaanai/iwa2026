let currentLine = null;
const listeProduits = document.querySelector("#listeProduits");
const ajouterBTN = document.querySelector("#ajouterBTN");
const ajouterProduitBtn = document.querySelector("#ajouterProduit");
const formContainer = document.querySelector("#formContainer");
const tableContainer = document.querySelector("#tableContainer");
const annulerBTN = document.querySelector("#annulerBTN");

// Ajouter un événement de clic au bouton "Ajouter"
ajouterBTN.addEventListener("click", (event) => {
  // Récupérer les données du formulaire
  const formData = new FormData(formProduit);
  const produit = Object.fromEntries(formData);

  if (event.target.innerText === "Mettre à jour") {
    produit.id = document.querySelector("#id").value;
    currentLine.children[0].innerText = produit.id;
    currentLine.children[1].innerText = produit.nom;
    currentLine.children[2].innerText = produit.prix;
    ajouterBTN.innerText = "Ajouter";
    currentLine = null;
  } else {
    axios
      .post(
        "https://6a2b02a5b687a7d5cbc4c5f1.mockapi.io/produits/Produit",
        produit,
      )
      .then((response) => {
        toTable(response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  }
  toLocalStorage(produit);
  document.querySelector("#id").disabled = false;
  formProduit.reset();
  formContainer.style.display = "none";
  tableContainer.style.display = "block";
});

const toLocalStorage = (produit) => {
  localStorage.setItem(produit.id, JSON.stringify(produit));
};

const toTable = (produit) => {
  const rows = listeProduits.querySelectorAll("tr");
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
    axios
      .delete(
        `https://6a2b02a5b687a7d5cbc4c5f1.mockapi.io/produits/Produit/${produit.id}`,
      )
      .then(() => {
        console.log("Produit supprimé avec succès");
        listeProduits.removeChild(tr);
        localStorage.removeItem(produit.id);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  });
  const updateIcon = document.createElement("img");
  updateIcon.src =
    "https://www.pngfind.com/pngs/m/686-6863121_reload-blue-icon-png-image-free-download-searchpng.png";
  updateIcon.addEventListener("click", (event) => {
    currentLine = event.target.parentElement.parentElement;
    document.querySelector("#id").value = currentLine.children[0].innerText;
    document.querySelector("#nom").value = currentLine.children[1].innerText;
    document.querySelector("#prix").value = currentLine.children[2].innerText;
    formContainer.style.display = "block";
    tableContainer.style.display = "none";
    document.querySelector("#id").disabled = true;
    ajouterBTN.innerText = "Mettre à jour";
  });

  tdAction.appendChild(deleteIcon);
  tdAction.appendChild(updateIcon);
  tr.appendChild(tdAction);
  listeProduits.appendChild(tr);
};
// Charger les produits depuis le localStorage lors du chargement de la page
window.addEventListener("load", () => {
  /**  Depuis localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const produit = JSON.parse(localStorage.getItem(key));
    toTable(produit);
  }*/
  //Depuis l'API
  axios
    .get("https://6a2b02a5b687a7d5cbc4c5f1.mockapi.io/produits/Produit")
    .then((response) => {
      response.data.forEach((produit) => {
        toTable(produit);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Ajouter un événement de clic au bouton "Ajouter" pour afficher le formulaire

ajouterProduitBtn.addEventListener("click", () => {
  formContainer.style.display = "block";
  tableContainer.style.display = "none";
});
// Ajouter un événement de clic au bouton "Annuler" pour masquer le formulaire
annulerBTN.addEventListener("click", () => {
  formContainer.style.display = "none";
  tableContainer.style.display = "block";
  document.querySelector("#id").disabled = false;
  formProduit.reset();
});
