import { Link } from 'react-router-dom'

// Navbar reçoit l'état et la fonction en props depuis App
function Navbar({ afficherFormulaire, setAfficherFormulaire }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Mon Portfolio
      </Link>

      <div className="navbar-liens">
        <Link to="/" className="navbar-lien">
          Mes Projets
        </Link>

        {/* Bouton ajouter projet dans la navbar */}
        <button
          className="navbar-btn-ajouter"
          onClick={() => setAfficherFormulaire(!afficherFormulaire)}
        >
          {afficherFormulaire ? 'Annuler' : '+ Ajouter un projet'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar