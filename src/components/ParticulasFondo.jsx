import React from 'react'
import { Points } from '@react-three/drei'
import { useParticulasFondo } from '../hooks/useParticulasFondo'
import * as THREE from 'three'

const ParticulasFondo = ({ cantidad = 400 }) => {
  const { puntosRef, capa1 } = useParticulasFondo(cantidad)
  return (
    <Points ref={puntosRef} geometry={capa1}>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  )
}
export default ParticulasFondo