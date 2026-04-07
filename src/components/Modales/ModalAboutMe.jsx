// src/components/Modales/ModalAboutMe.jsx
import React, { useState, useEffect } from 'react'
import './ModalAboutMe.css'

const ModalAboutMe = ({ isOpen, onClose }) => {
  const [textoVisible, setTextoVisible] = useState('')
  const [mostrarCursor, setMostrarCursor] = useState(true)
  
  const textoCompleto = `Soy un creador digital enfocado en transformar ideas en espacios y objetos 3D para videojuegos. Me caracterizo por ser una persona creativa, detallista y constante. Disfruto construir escenarios y props que no solo se vean bien, sino que también tengan sentido dentro de un mundo interactivo.

Mis habilidades se centran en el modelado y el texturizado 3D, así como en la organización de procesos de trabajo desde la escultura hasta el resultado final optimizado para videojuegos. Me gusta experimentar con estilos visuales y buscar soluciones visuales propias, manteniendo siempre un equilibrio entre lo artístico y lo técnico.`

  // Animación de escritura
  useEffect(() => {
    if (!isOpen) {
      setTextoVisible('')
      return
    }

    let index = 0
    const interval = setInterval(() => {
      if (index < textoCompleto.length) {
        setTextoVisible(textoCompleto.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)

    // Parpadeo del cursor
    const cursorInterval = setInterval(() => {
      setMostrarCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(cursorInterval)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-about-overlay" onClick={onClose}>
      <div className="modal-about-contenedor" onClick={(e) => e.stopPropagation()}>
        {/* Partículas de fondo */}
        <div className="about-particulas">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="about-particula"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: i % 3 === 0 ? '#667eea' : i % 3 === 1 ? '#764ba2' : '#a0a8ff'
              }}
            />
          ))}
        </div>

        <button className="modal-about-cerrar" onClick={onClose}>
          <span className="cerrar-icono">✕</span>
        </button>

        <div className="modal-about-contenido">
          <h1 className="about-titulo">Sobre Mí</h1>
          <div className="about-texto-container">
            <p className="about-texto">
              {textoVisible}
              {mostrarCursor && <span className="about-cursor">|</span>}
            </p>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-valor">3+</span>
              <span className="stat-label">Años experiencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-valor">6+</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-item">
              <span className="stat-valor">100%</span>
              <span className="stat-label">Interactividad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAboutMe