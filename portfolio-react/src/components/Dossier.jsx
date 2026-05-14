import { useState, useEffect } from 'react'
import Projet from './Projet'
import AjouterProjet from './AjouterProjet'

const API_URL = '/api/projects'

function Dossier({ afficherFormulaire, setAfficherFormulaire }) {
  const [projets, setProjets] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setProjets(data))
  }, [])

  function ajouterProjet(formData) {
    fetch(API_URL, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(projetCree => {
        setProjets([...projets, projetCree])
        setAfficherFormulaire(false)
      })
  }

  function supprimerProjet(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProjets(projets.filter(projet => projet._id !== id))
      })
  }

  return (
    <div className="dossier">
      {afficherFormulaire && (
        <AjouterProjet onAjouter={ajouterProjet} />
      )}

      {projets.length === 0 ? (
        <div className="liste-vide-container">
          <p className="liste-vide">Aucun projet pour le moment.</p>
          <p className="liste-vide-hint">Cliquez sur "+ Ajouter un projet" pour commencer.</p>
        </div>
      ) : (
        <div className="liste-projets">
          {projets.map(projet => (
            <Projet
              key={projet._id}
              projet={projet}
              onSupprimer={supprimerProjet}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dossier