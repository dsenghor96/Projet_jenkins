const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const {
  ajouterProjet,
  obtenirProjets,
  obtenirProjet,
  modifierProjet,
  supprimerProjet
} = require('../controllers/projectController');

router.post('/', upload.single('image'), ajouterProjet);
router.get('/', obtenirProjets);
router.get('/:id', obtenirProjet);
router.put('/:id', upload.single('image'), modifierProjet);
router.delete('/:id', supprimerProjet);

module.exports = router;