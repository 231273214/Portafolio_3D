import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import Habitacion from './components/Habitacion'
import ModalProyectos from './components/Modales/ModalProyectos'
import ModalAboutMe from './components/Modales/ModalAboutMe'
import ModalCalendario from './components/Modales/ModalCalendario'
import ModalCV from './components/Modales/ModalCV'
import ModalAssets from './components/Modales/ModalAssets'
import ModalVideo from './components/Modales/ModalVideo'
import ParticulasFondo from './components/ParticulasFondo'
import { URLS_REDES } from './data/habitacionConfig'

function App() {
  const [showProjects, setShowProjects] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showCalendario, setShowCalendario] = useState(false)
  const [showCV, setShowCV] = useState(false)
  const [showAssets, setShowAssets] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [currentAsset, setCurrentAsset] = useState(null)      // nombre del objeto para assets (tablet)
  const [currentVideo, setCurrentVideo] = useState(null)     // nombre del objeto para video (PC, Cara_Creeper, Taza_Lapiz)

  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 })

  const audioRef = useRef(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleSelectObject = useCallback(({ type, name }) => {
    // Redes sociales
    if (type === 'url' && URLS_REDES[name]) {
      window.open(URLS_REDES[name], '_blank', 'noopener,noreferrer')
      return
    }

    // Música (bafles)
    if (type === 'musica') {
      if (!audioRef.current) {
        audioRef.current = new Audio('/musica/TheLessIKnowTheBetter.mp3')
        audioRef.current.loop = true
        audioRef.current.volume = 0.08
      }
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.warn)
      } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      return
    }

    // Calendario
    if (type === 'calendario') {
      setShowCalendario(true)
      return
    }

    // Proyectos
    if (type === 'proyectos') {
      setShowProjects(true)
      return
    }

    // Sobre mí
    if (type === 'about') {
      setShowAbout(true)
      return
    }

    // Hoja de vida (cámara)
    if (type === 'cv') {
      setShowCV(true)
      return
    }

    // Assets (tablet)
    if (type === 'assets') {
      setCurrentAsset(name)
      setShowAssets(true)
      return
    }

    // Videos (PC, Cara_Creeper, Taza_Lapiz)
    if (type === 'video') {
      setCurrentVideo(name)
      setShowVideo(true)
      return
    }
  }, [])

  const minAzimuth = -Math.PI / 15.2
  const maxAzimuth = Math.PI / 1.8

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [2.13, 1.95, 2.34], fov: 48 }}>
        <color attach="background" args={['#1a1a2e']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5,5,5]} intensity={1.5} castShadow shadow-mapSize={[2048,2048]} />
        <pointLight position={[-2,3,2]} intensity={0.8} color="#ffaa66" />
        <pointLight position={[3,2,-2]} intensity={0.6} color="#4466ff" />
        <pointLight position={[0,-1,2]} intensity={0.3} color="#8866ff" />

        <ParticulasFondo cantidad={400} />

        <Suspense fallback={null}>
          <Habitacion onTooltip={setTooltip} onSelectObject={handleSelectObject} />
        </Suspense>

        <OrbitControls
          target={[0,0.8,0]}
          minAzimuthAngle={minAzimuth}
          maxAzimuthAngle={maxAzimuth}
          maxPolarAngle={Math.PI/2.2}
          minPolarAngle={0.1}
          enableZoom
          enablePan
          zoomSpeed={1.2}
          panSpeed={0.8}
          rotateSpeed={1.0}
        />
      </Canvas>

      {/* Modales */}
      <ModalProyectos isOpen={showProjects} onClose={() => setShowProjects(false)} />
      <ModalAboutMe isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <ModalCalendario isOpen={showCalendario} onClose={() => setShowCalendario(false)} />
      <ModalCV isOpen={showCV} onClose={() => setShowCV(false)} />
      <ModalAssets isOpen={showAssets} onClose={() => setShowAssets(false)} objectName={currentAsset} />
      <ModalVideo isOpen={showVideo} onClose={() => setShowVideo(false)} objectName={currentVideo} />

      {/* Tooltip flotante */}
      {tooltip.visible && (
        <div style={{
          position:'fixed', left:tooltip.x, top:tooltip.y,
          background:'rgba(0,0,0,0.7)', color:'#fff', padding:'5px 10px',
          borderRadius:'5px', fontSize:'12px', pointerEvents:'none', zIndex:1000
        }}>
          {tooltip.text}
        </div>
      )}

      {/* Instrucciones */}
      <div style={{
        position:'absolute', bottom:20, left:20,
        background:'rgba(0,0,0,0.4)', color:'white', fontSize:'11px',
        padding:'5px 10px', borderRadius:5, fontFamily:'monospace'
      }}>
        🖱️ Clic izq para girar | Clic Der para moverse | Rueda para zoom
      </div>
    </div>
  )
}

export default App