// src/components/Modales/ModalVideo.jsx
import React, { useState } from 'react';
import './ModalVideo.css';

const VIDEOS = {
  Libros: {
    titulo: 'Animación de un videojuego 2.5D con sus escenarios ',
    descripcion: 'Render de la vista de como seria un videojeugo 2.5D con sus personajes y escenarios.',
    ruta: '/videos/Escenarios.mp4'
  },
  Cara_Creeper: {
    titulo: 'Escenario del bosque encantado',
    descripcion: 'Render de un bosque el cual tiene varios elementos naturales como de ciudad.',
    ruta: '/videos/Bosque.mp4'
  },
  Taza_Lapiz: {
    titulo: 'Ciudad Utopia Riber',
    descripcion: 'Render de una ciudad futurista con pistas, edificios y borques importantes de la ciudad.',
    ruta: '/videos/Ciudad futurista.mp4'
  }
};

const ModalVideo = ({ isOpen, onClose, objectName }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  if (!isOpen) return null;

  const videoData = VIDEOS[objectName];
  if (!videoData) return null;

  return (
    <div className="video-overlay" onClick={onClose}>
      <div className="video-container" onClick={e => e.stopPropagation()}>
        <button className="video-close" onClick={onClose}>✕</button>
        <h2 className="video-title">{videoData.titulo}</h2>
        <p className="video-description">{videoData.descripcion}</p>
        <div className="video-wrapper">
          <video
            src={videoData.ruta}
            controls
            autoPlay
            className="video-player"
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalVideo;