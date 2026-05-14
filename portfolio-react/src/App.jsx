import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Dossier from './components/Dossier'
import DetaillerProjet from './components/DetaillerProjet'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './App.css'

function App() {
  // État géré ici pour être partagé entre Navbar et Dossier
  const [afficherFormulaire, setAfficherFormulaire] = useState(false)

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {/* On passe l'état et la fonction à Navbar */}
        <Navbar
          afficherFormulaire={afficherFormulaire}
          setAfficherFormulaire={setAfficherFormulaire}
        />

        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <Dossier
                  afficherFormulaire={afficherFormulaire}
                  setAfficherFormulaire={setAfficherFormulaire}
                />
              }
            />
            <Route path="/projet/:id" element={<DetaillerProjet />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App