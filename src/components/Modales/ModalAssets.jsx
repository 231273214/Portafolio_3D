import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';
import './ModalAssets.css';

function FBXThumbnail({ modelPath, scale = 0.5 }) {
  const fbx = useFBX(modelPath);
  const model = fbx.clone();
  return <primitive object={model} scale={scale} />;
}

const ASSETS = [
  {
    id: 'Silla',
    nombre: 'Silla',
    descripcion: 'Silla elegante para comedor.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Silla.fbx',
    escala: 0.6,
  },
  {
    id: 'Mesa',
    nombre: 'Mesa',
    descripcion: 'Mesa de centro moderna.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Mesa.fbx',
    escala: 0.5,
  },
  {
    id: 'Barril',
    nombre: 'Barril',
    descripcion: 'Barril de madera estilo rústico.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Barril.fbx',
    escala: 0.5,
  },
  {
    id: 'Botella_Licor',
    nombre: 'Botella de Licor',
    descripcion: 'Botella de licor premium.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Botella_Licor.fbx',
    escala: 0.4,
  },
  {
    id: 'Botella_Licor2',
    nombre: 'Botella de Licor 2',
    descripcion: 'Otra botella de licor.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Botella_Licor2.fbx',
    escala: 0.4,
  },
  {
    id: 'Candelabro',
    nombre: 'Candelabro',
    descripcion: 'Candelabro de hierro forjado.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Candelabro.fbx',
    escala: 0.5,
  },
  {
    id: 'Copa',
    nombre: 'Copa',
    descripcion: 'Copa de cristal.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Copa.fbx',
    escala: 0.4,
  },
  {
    id: 'Vaso_Cerveza',
    nombre: 'Vaso de Cerveza',
    descripcion: 'Vaso para cerveza artesanal.', // ← CAMBIA ESTO
    modelo: '/Models/Assets/Vaso_Cerveza.fbx',
    escala: 0.4,
  },
];

const ModalAssets = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="assets-overlay" onClick={onClose}>
      <div className="assets-container" onClick={(e) => e.stopPropagation()}>
        <button className="assets-close" onClick={onClose}>✕</button>
        <h2 className="assets-title">🎨 Mis Assets 3D</h2>
        <p className="assets-subtitle">Explora mis modelos — cada uno se puede rotar y hacer zoom</p>

        <div className="assets-grid">
          {ASSETS.map((asset) => (
            <div key={asset.id} className="asset-card">
              <h3 className="asset-name">{asset.nombre}</h3>
              <div className="asset-viewer">
                <Suspense fallback={<div className="loading">Cargando modelo...</div>}>
                  <Canvas
                    camera={{ position: [0, 1.2, 2.5], fov: 45 }}
                    style={{ width: '100%', height: '200px', background: '#0a0a14', borderRadius: '8px' }}
                  >
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[2, 5, 2]} intensity={1} />
                    <FBXThumbnail modelPath={asset.modelo} scale={asset.escala} />
                    <OrbitControls enableZoom enablePan enableRotate />
                  </Canvas>
                </Suspense>
              </div>
              <p className="asset-description">{asset.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalAssets;