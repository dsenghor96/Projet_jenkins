import { useState } from 'react'

function AjouterProjet({ onAjouter }) {
  const [titre, setTitre] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [lien, setLien] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!titre) return

    const formData = new FormData()
    formData.append('titre', titre)
    formData.append('description', description)
    formData.append('technologies', technologies)
    formData.append('lien', lien)
    if (image) formData.append('image', image)

    onAjouter(formData)

    setTitre('')
    setImage(null)
    setDescription('')
    setTechnologies('')
    setLien('')
  }

  return (
    <form className="formulaire-ajout" onSubmit={handleSubmit}>
      <h2>Ajouter un projet</h2>

      <div className="champ">
        <label>Titre *</label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Nom du projet"
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
          placeholder="Description du projet"
        />
      </div>

      <div className="champ">
        <label>Technologies</label>
        <input
          type="text"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="React, AWS, Docker, ..."
        />
      </div>

      <div className="champ">
        <label>Lien GitHub</label>
        <input
          type="text"
          value={lien}
          onChange={(e) => setLien(e.target.value)}
          placeholder="https://github.com/..."
        />
      </div>

      <button type="submit" className="btn-valider">
        Valider
      </button>

    </form>
  )
}

export default AjouterProjet