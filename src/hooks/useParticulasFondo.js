import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const useParticulasFondo = (cantidad = 400) => {
  const puntosRef = useRef()

  const capa1 = useMemo(() => {
    const posiciones = []
    const colores = []
    const paleta = [0x6688ff, 0xaa88ff, 0x88ccff].map(c => new THREE.Color(c))
    for (let i = 0; i < cantidad; i++) {
      const radio = 6 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      posiciones.push(
        radio * Math.sin(phi) * Math.cos(theta),
        radio * Math.sin(phi) * Math.sin(theta) * 0.7,
        radio * Math.cos(phi)
      )
      const color = paleta[Math.floor(Math.random() * paleta.length)]
      colores.push(color.r, color.g, color.b)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(posiciones), 3))
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colores), 3))
    return geo
  }, [cantidad])

  useFrame(() => {
    if (puntosRef.current) puntosRef.current.rotation.y += 0.0005
  })

  return { puntosRef, capa1 }
}