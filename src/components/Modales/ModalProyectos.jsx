import React from 'react'
import { proyectos } from '../../data/proyectos'
import './ModalProyectos.css'

const ModalProyectos = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenedor" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h1 className="modal-titulo">Proyectos 3D</h1>
            <p className="modal-subtitulo">
              Una colección de mis mejores trabajos de modelado y texturizado
            </p>
          </div>
          <button className="modal-cerrar" onClick={onClose}>
            <span className="cerrar-icono">✕</span>
          </button>
        </div>

        {/* SOLO este div tiene scroll */}
        <div className="modal-contenido-scroll">
          <div className="modal-grid">
            {proyectos.map((proyecto) => (
              <ProyectoCard key={proyecto.id} proyecto={proyecto} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente separado para cada proyecto (con efectos hover)
const ProyectoCard = ({ proyecto }) => {
  return (
    <div className="proyecto-card">
      <div 
        className="proyecto-imagen"
        style={{ background: `linear-gradient(135deg, ${proyecto.color} 0%, ${proyecto.color}dd 100%)` }}
      >
        <span className="proyecto-icono">{proyecto.icono}</span>
        <span className="proyecto-categoria">{proyecto.categoria}</span>
      </div>
      
      <div className="proyecto-contenido">
        <h3 className="proyecto-titulo">{proyecto.titulo}</h3>
        <p className="proyecto-descripcion">{proyecto.descripcion}</p>
        
        <div className="proyecto-tecnologias">
          {proyecto.tecnologias.map((tec, index) => (
            <span key={index} className="tecnologia-tag">
              {tec}
            </span>
          ))}
        </div>
        
        <button className="proyecto-boton">
          Ver Proyecto 
        </button>
      </div>
    </div>
  )
}

export default ModalProyectos