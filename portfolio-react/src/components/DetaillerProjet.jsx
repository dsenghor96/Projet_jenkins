import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const API_URL = '/api/projects'
const BASE_URL = ''

function DetaillerProjet() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [projet, setProjet] = useState(null)
  const [modeEdition, setModeEdition] = useState(false)
  const [titre, setTitre] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [lien, setLien] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(response => response.json())
      .then(data => {
        setProjet(data)
        setTitre(data.titre)
        setDescription(data.description)
        setTechnologies(data.technologies.join(', '))
        setLien(data.lien)
      })
  }, [id])

  function handleEditer(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('titre', titre)
    formData.append('description', description)
    formData.append('technologies', technologies)
    formData.append('lien', lien)
    if (image) formData.append('image', image)

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        setProjet(data)
        setModeEdition(false)
      })
  }

  if (!projet) return <p>Chargement...</p>

  return (
    <div className="detail-projet">

      {modeEdition ? (

        <form className="formulaire-ajout" onSubmit={handleEditer}>
          <h2>Editer le projet</h2>

          <div className="champ">
            <label>Titre</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </div>

          <div className="champ">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="champ">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="champ">
            <label>Technologies</label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </div>

          <div className="champ">
            <label>Lien GitHub</label>
            <input
              type="text"
              value={lien}
              onChange={(e) => setLien(e.target.value)}
            />
          </div>

          <div className="boutons-detail">
            <button type="submit" className="btn-valider">Sauvegarder</button>
            <button
              type="button"
              className="btn-annuler"
              onClick={() => setModeEdition(false)}
            >
              Annuler
            </button>
          </div>
        </form>

      ) : (

        <div>
          <h2>{projet.titre}</h2>
          {projet.image && (
            <img
              src={`${BASE_URL}/uploads/${projet.image}`}
              alt={projet.titre}
              className="projet-image"
            />
          )}
          <p><strong>Description :</strong> {projet.description}</p>
          <p><strong>Technologies :</strong> {projet.technologies.join(', ')}</p>
          <p><strong>Lien :</strong> <a href={projet.lien} target="_blank">{projet.lien}</a></p>

          <div className="boutons-detail">
            <button
              className="btn-annuler"
              onClick={() => navigate('/')}
            >
              Retour
            </button>
            <button
              className="btn-editer"
              onClick={() => setModeEdition(true)}
            >
              Editer
            </button>
          </div>
        </div>

      )}

    </div>
  )
}

export default DetaillerProjet