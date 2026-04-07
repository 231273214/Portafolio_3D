// src/components/Portafolio2D.jsx
import React, { useState } from 'react'

const Portafolio2D = ({ onVolver3D }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null)

  const proyectos = [
    { id: 1, titulo: 'Proyecto 3D - Escultura Dragón', descripcion: 'Escultura detallada para impresión 3D.', tecnologias: ['Blender', 'ZBrush'], icono: '🐉' },
    { id: 2, titulo: 'Proyecto 3D - Personaje Stylized', descripcion: 'Personaje para videojuego indie.', tecnologias: ['Maya', 'Substance'], icono: '🎮' },
    { id: 3, titulo: 'Visualización Arquitectónica', descripcion: 'Loft moderno fotorrealista.', tecnologias: ['3ds Max', 'V-Ray'], icono: '🏛️' },
    { id: 4, titulo: 'Nave Sci-fi', descripcion: 'Modelado hard surface para juego espacial.', tecnologias: ['Maya', 'Substance'], icono: '🚀' },
  ]

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      overflow: 'auto',
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <button onClick={onVolver3D} style={{
        position: 'fixed',
        top: 20,
        left: 20,
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '30px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
        ← Volver a la habitación 3D
      </button>

      <div style={{ textAlign: 'center', marginBottom: '50px', paddingTop: '40px' }}>
        <h1 style={{ fontSize: '48px', margin: 0, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Mi Portafolio 3D
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginTop: '10px' }}>
          Artista 3D especializado en modelado y texturizado para videojuegos
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {proyectos.map(proyecto => (
          <div key={proyecto.id}
            onClick={() => setProyectoSeleccionado(proyecto)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>{proyecto.icono}</div>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>{proyecto.titulo}</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{proyecto.descripcion}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
              {proyecto.tecnologias.map(tec => (
                <span key={tec} style={{
                  background: 'rgba(102,126,234,0.3)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#a0a8ff'
                }}>{tec}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {proyectoSeleccionado && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200
        }} onClick={() => setProyectoSeleccionado(null)}>
          <div style={{
            background: '#1a1a2e',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            border: '1px solid rgba(255,255,255,0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '64px', textAlign: 'center', marginBottom: '20px' }}>{proyectoSeleccionado.icono}</div>
            <h2 style={{ color: 'white', textAlign: 'center' }}>{proyectoSeleccionado.titulo}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', textAlign: 'center' }}>
              {proyectoSeleccionado.descripcion}
            </p>
            <button onClick={() => setProyectoSeleccionado(null)} style={{
              display: 'block',
              margin: '20px auto 0',
              background: '#667eea',
              border: 'none',
              color: 'white',
              padding: '10px 30px',
              borderRadius: '30px',
              cursor: 'pointer'
            }}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portafolio2D