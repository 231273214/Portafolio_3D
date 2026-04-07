import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './ModalAssets.css'

// Componente que carga y muestra un modelo GLB
function ModelViewer({ modelPath }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} />
}

// Lista de assets (ajusta rutas y textos)
const ASSETS = [
  {
    id: 'tablet',
    nombre: 'Tablet 3D',
    descripcion: 'Modelo de tablet con pantalla interactiva. Ideal para presentaciones.',
    modelo: '/models/tablet.glb',
    icono: '📱'
  },
  {
    id: 'banquito',
    nombre: 'Banquito',
    descripcion: 'Banquito de madera estilo rústico, modelado en Blender.',
    modelo: '/models/banquito.glb',
    icono: '🪑'
  },
  {
    id: 'reloj',
    nombre: 'Reloj de pared',
    descripcion: 'Reloj antiguo con texturas detalladas.',
    modelo: '/models/reloj.glb',
    icono: '⏰'
  }
  // Agrega más assets aquí
]

const ModalAssets = ({ isOpen, onClose, objectName }) => {
  const [selectedAsset, setSelectedAsset] = useState(null)

  if (!isOpen) return null

  // Si se seleccionó un asset, mostrar el visor 3D
  if (selectedAsset) {
    return (
      <div className="assets-overlay" onClick={onClose}>
        <div className="assets-container" onClick={(e) => e.stopPropagation()}>
          <button className="assets-close" onClick={onClose}>✕</button>
          <div className="assets-viewer">
            <button className="assets-back" onClick={() => setSelectedAsset(null)}>
              ← Volver a la galería
            </button>
            <h2 className="assets-viewer-title">{selectedAsset.nombre}</h2>
            <div className="assets-model-container">
              <Canvas camera={{ position: [2, 1, 3] }} style={{ background: '#0a0a14', borderRadius: '12px' }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <ModelViewer modelPath={selectedAsset.modelo} />
                <OrbitControls enableZoom enablePan />
              </Canvas>
            </div>
            <p className="assets-description">{selectedAsset.descripcion}</p>
          </div>
        </div>
      </div>
    )
  }

  // Vista de galería (todas las tarjetas)
  return (
    <div className="assets-overlay" onClick={onClose}>
      <div className="assets-container assets-gallery" onClick={(e) => e.stopPropagation()}>
        <button className="assets-close" onClick={onClose}>✕</button>
        <h2 className="assets-title">🎨 Mis Assets 3D</h2>
        <p className="assets-subtitle">Explora mis modelos</p>

        <div className="assets-grid">
          {ASSETS.map((asset) => (
            <div key={asset.id} className="asset-card">
              <div className="asset-icon">{asset.icono}</div>
              <h3 className="asset-name">{asset.nombre}</h3>
              <p className="asset-description">{asset.descripcion}</p>
              <button
                className="asset-button"
                onClick={() => setSelectedAsset(asset)}
              >
                Ver modelo 3D
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ModalAssets