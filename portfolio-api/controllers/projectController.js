const Project = require('../models/project');

// Ajouter un projet
const ajouterProjet = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const project = await Project.create({ ...req.body, image });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retourner tous les projets
const obtenirProjets = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retourner un projet par ID
const obtenirProjet = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un projet
const modifierProjet = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.image = req.file.filename;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un projet
const supprimerProjet = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  ajouterProjet,
  obtenirProjets,
  obtenirProjet,
  modifierProjet,
  supprimerProjet
};