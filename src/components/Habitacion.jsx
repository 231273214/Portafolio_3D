import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  NOMBRES_AMIGABLES,
  obtenerComportamiento,
  marcarInteractivos
} from '../data/habitacionConfig'

function getFirstMaterial(material) {
  if (!material) return null
  return Array.isArray(material) ? material[0] : material
}

function getMaterialColorSnapshot(material) {
  const mat = getFirstMaterial(material)
  return mat?.color ? mat.color.clone() : null
}

function getMaterialEmissiveSnapshot(material) {
  const mat = getFirstMaterial(material)
  return typeof mat?.emissiveIntensity === 'number'
    ? mat.emissiveIntensity
    : 0
}

export default function Habitacion({ onTooltip, onSelectObject }) {
  const { scene } = useGLTF('/Portafolio_3D/Models/Habitacion.glb')
  const { camera, gl } = useThree()

  const [hoveredGroup, setHoveredGroup] = useState(null)

  const originalStates = useRef(new Map())
  const previousHoveredRef = useRef(null)

  const lightRefs = useRef([])
  const chairRefs = useRef([])

  const waveRef = useRef(null)
  const waveStateRef = useRef({
    active: false,
    scale: 1,
    opacity: 1
  })

  const restoreNode = (root) => {
    if (!root) return

    root.traverse((obj) => {
      const original = originalStates.current.get(obj.uuid)
      if (!original) return

      obj.position.copy(original.position)
      obj.rotation.copy(original.rotation)
      obj.scale.copy(original.scale)

      const mat = getFirstMaterial(obj.material)
      if (mat?.color && original.color) {
        mat.color.copy(original.color)
      }
      if (mat && 'emissiveIntensity' in mat) {
        mat.emissiveIntensity = original.emissiveIntensity ?? 0
      }
    })
  }

  const triggerWave = (worldPosition) => {
    if (!scene) return

    if (!waveRef.current) {
      const geometry = new THREE.RingGeometry(0.15, 0.22, 32)
      const material = new THREE.MeshBasicMaterial({
        color: 0x44aaff,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
      })

      const ring = new THREE.Mesh(geometry, material)
      ring.rotation.x = -Math.PI / 2
      ring.visible = false
      scene.add(ring)
      waveRef.current = ring
    }

    waveStateRef.current = {
      active: true,
      scale: 1,
      opacity: 1
    }

    waveRef.current.position.copy(worldPosition)
    waveRef.current.scale.setScalar(1)
    waveRef.current.visible = true
    if (waveRef.current.material) {
      waveRef.current.material.opacity = 1
    }
  }

  useEffect(() => {
    if (!scene) return

    originalStates.current.clear()

    const lights = []
    const chairs = []

    scene.traverse((obj) => {
      if (obj.isMesh || obj.isGroup) {
        originalStates.current.set(obj.uuid, {
          position: obj.position.clone(),
          rotation: obj.rotation.clone(),
          scale: obj.scale.clone(),
          color: getMaterialColorSnapshot(obj.material),
          emissiveIntensity: getMaterialEmissiveSnapshot(obj.material)
        })
      }

      if (obj.name?.startsWith('Luz') && obj.material) {
        lights.push(obj)
      }

      if (
        obj.name === 'Cube057' ||
        obj.name === 'Cube057_1' ||
        obj.name === 'Cube057_2' ||
        obj.name === 'Cube057_3'
      ) {
        chairs.push(obj)
      }
    })

    lightRefs.current = lights
    chairRefs.current = chairs

    marcarInteractivos(scene)
  }, [scene])

  useEffect(() => {
    const previous = previousHoveredRef.current

    if (previous && previous !== hoveredGroup) {
      restoreNode(previous)
    }

    previousHoveredRef.current = hoveredGroup
  }, [hoveredGroup])

  useEffect(() => {
    return () => {
      if (previousHoveredRef.current) {
        restoreNode(previousHoveredRef.current)
      }

      if (waveRef.current) {
        scene?.remove(waveRef.current)
        waveRef.current.geometry?.dispose?.()
        waveRef.current.material?.dispose?.()
        waveRef.current = null
      }
    }
  }, [scene])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    lightRefs.current.forEach((obj, index) => {
      const mat = getFirstMaterial(obj.material)
      if (!mat) return

      const offset = index * 0.12
      const hue = (t * 0.1 + offset) % 1

      if (mat.color) {
        mat.color.setHSL(hue, 0.9, 0.6)
      }

      if ('emissiveIntensity' in mat) {
        mat.emissiveIntensity = 0.4 + Math.sin(t * 2 + offset) * 0.3
      }
    })

    chairRefs.current.forEach((obj) => {
      const original = originalStates.current.get(obj.uuid)
      if (!original) return

      const angulo = Math.sin(t * 1.5) * 0.3
      obj.rotation.y = original.rotation.y + angulo
    })

    if (hoveredGroup) {
      const comportamiento = obtenerComportamiento(
        hoveredGroup.userData.collectionName
      )
      const original = originalStates.current.get(hoveredGroup.uuid)
      if (!original) return

      if (comportamiento.hover === 'girarElevar') {
        const rotY = Math.sin(t * 3) * 0.1
        const elevacion = Math.abs(Math.sin(t * 3)) * 0.1

        hoveredGroup.rotation.y = original.rotation.y + rotY
        hoveredGroup.position.y = original.position.y + elevacion
      }

      if (comportamiento.hover === 'saltar') {
        const factor = Math.abs(Math.sin(t * 5)) * 0.1

        hoveredGroup.scale.setScalar(original.scale.x + factor)
        hoveredGroup.position.y = original.position.y + factor * 0.2
      }

      if (comportamiento.hover === 'brilloPantalla') {
        const meshes = []
        const screenMeshes = []

        hoveredGroup.traverse((child) => {
          if (!child.isMesh) return
          meshes.push(child)

          const name = (child.name || '').toLowerCase()
          if (name.includes('screen') || name.includes('pantalla')) {
            screenMeshes.push(child)
          }
        })

        const targets = screenMeshes.length > 0 ? screenMeshes : meshes

        targets.forEach((mesh) => {
          const mat = getFirstMaterial(mesh.material)
          if (!mat) return

          if (mat.color) mat.color.setHex(0xaaccff)
          if ('emissiveIntensity' in mat) mat.emissiveIntensity = 0.9
        })
      }
    }

    if (waveRef.current && waveStateRef.current.active) {
      const nextScale = waveStateRef.current.scale + 0.05
      const nextOpacity = waveStateRef.current.opacity - 0.02

      waveStateRef.current.scale = nextScale
      waveStateRef.current.opacity = nextOpacity

      waveRef.current.scale.setScalar(nextScale)

      if (waveRef.current.material) {
        waveRef.current.material.opacity = Math.max(0, nextOpacity)
      }

      if (nextOpacity <= 0) {
        waveStateRef.current.active = false
        waveRef.current.visible = false
      }
    }
  })

  useEffect(() => {
    if (!scene) return

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const getInteractiveRoot = (obj) => {
      let current = obj
      while (current && !current.userData.isInteractive) {
        current = current.parent
      }
      return current || null
    }

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      let hitGroup = null

      for (const intersect of intersects) {
        const root = getInteractiveRoot(intersect.object)
        if (root) {
          hitGroup = root
          break
        }
      }

      if (hitGroup) {
        setHoveredGroup(hitGroup)

        const collectionName = hitGroup.userData.collectionName || hitGroup.name || ''
        const nombreMostrar =
          NOMBRES_AMIGABLES[collectionName] ||
          collectionName.replace(/_/g, ' ')

        onTooltip?.({
          visible: true,
          text: nombreMostrar,
          x: event.clientX + 15,
          y: event.clientY + 10
        })

        const comportamiento = obtenerComportamiento(collectionName)

        if (comportamiento.hover === 'onda' && !waveStateRef.current.active) {
          const pos = new THREE.Vector3()
          hitGroup.getWorldPosition(pos)
          triggerWave(pos)
        }
      } else {
        setHoveredGroup(null)
        onTooltip?.({ visible: false })
      }
    }

    const onClick = (event) => {
      mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      for (const intersect of intersects) {
        const root = getInteractiveRoot(intersect.object)
        if (!root) continue

        const collName = root.userData.collectionName || root.name || ''
        const comportamiento = obtenerComportamiento(collName)

        const worldPos = new THREE.Vector3()
        root.getWorldPosition(worldPos)

        onSelectObject?.({
          type: comportamiento.click,
          name: collName,
          position: worldPos,
          object: root
        })

        break
      }
    }

    gl.domElement.addEventListener('mousemove', onMouseMove)
    gl.domElement.addEventListener('click', onClick)

    return () => {
      gl.domElement.removeEventListener('mousemove', onMouseMove)
      gl.domElement.removeEventListener('click', onClick)
    }
  }, [scene, camera, gl, onTooltip, onSelectObject])

  return <primitive object={scene} />
}

useGLTF.preload(`${import.meta.env.BASE_URL}Models/Habitacion.glb`)