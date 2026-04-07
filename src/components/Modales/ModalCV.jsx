import React, { useState, useRef } from 'react'
import './ModalCV.css'

const IMAGENES = {
  diagramada: {
    label: 'Versión Visual',
    description: 'Diseño creativo y diagramado',
    path: '/imagenes/Hoja de vida diagramada.jpg'
  },
  ats: {
    label: 'Versión ATS',
    description: 'Optimizada para reclutadores',
    path: '/imagenes/Hoja de vida ATS Sergio Rangel.jpg'
  }
}

const ModalCV = ({ isOpen, onClose }) => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null)
  const [zoom, setZoom] = useState(1)
  const imageContainerRef = useRef(null)

  if (!isOpen) return null

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))
  const resetZoom = () => setZoom(1)

  const handleImageLoad = () => {
    resetZoom()
  }

  return (
    <div className="cv-overlay" onClick={onClose}>
      <div className="cv-container" onClick={(e) => e.stopPropagation()}>
        <button className="cv-close" onClick={onClose}>✕</button>

        {!imagenSeleccionada ? (
          <>
            <h2 className="cv-title">Clic para ver hojas de vida</h2>
            <div className="cv-options">
              {Object.entries(IMAGENES).map(([key, value]) => (
                <div
                  key={key}
                  className="cv-card"
                  onClick={() => setImagenSeleccionada(value.path)}
                >
                  <div className="cv-icon"></div>
                  <h3>{value.label}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="cv-viewer">
            <div className="cv-viewer-header">
              <button className="cv-back" onClick={() => setImagenSeleccionada(null)}>
                ← Volver
              </button>
              <div className="cv-zoom-controls">
                <button onClick={handleZoomOut} title="Alejar">−</button>
                <span className="cv-zoom-value">{Math.round(zoom * 100)}%</span>
                <button onClick={handleZoomIn} title="Acercar">+</button>
                <button onClick={resetZoom} title="Restablecer">⟳</button>
              </div>
            </div>
            <div 
              className="cv-image-wrapper" 
              ref={imageContainerRef}
              style={{ overflow: 'auto', cursor: zoom > 1 ? 'grab' : 'default' }}
            >
              <img 
                src={imagenSeleccionada} 
                alt="Hoja de vida"
                className="cv-image"
                style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s ease' }}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalCV