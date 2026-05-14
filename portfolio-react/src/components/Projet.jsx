import { Link } from 'react-router-dom'

const API_URL = ''

function Projet({ projet, onSupprimer }) {
  return (
    <div className="projet-card">

      {projet.image && (
        <img
          src={`${API_URL}/uploads/${projet.image}`}
          alt={projet.titre}
          className="projet-image"
        />
      )}

      <Link to={`/projet/${projet._id}`} className="projet-libelle">
        {projet.titre}
      </Link>

      <button
        className="btn-supprimer"
        onClick={() => onSupprimer(projet._id)}
      >
        Supprimer
      </button>

    </div>
  )
}

export default Projet