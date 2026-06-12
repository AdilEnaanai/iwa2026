import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// Connexion  à MongoDB

await mongoose.connect(
  "mongodb://root:1234@localhost:27017/ventes?authSource=admin",
);
console.log("Connected to MongoDB");

const produitSchema = new mongoose.Schema({
  id: Number,
  nom: String,
  prix: Number,
});
const Produit = mongoose.model("Produit", produitSchema);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
//Récupérer les produits
app.get("/produits", async (req, res) => {
  const produits = await Produit.find();
  res.json(produits);
});

//Ajouter un produit
app.post("/produits", async (req, res) => {
  const produit = await Produit.create(req.body);
  res.status(201).json(produit);
});

//Supprimer un produit
app.delete("/produits/:id", async (req, res) => {
  await Produit.deleteOne({ id: req.params.id });
  res.json({ message: "Produit supprimé" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
