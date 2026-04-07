import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraFocusController({ target, onArrive, enabled = true }) {
  const { camera } = useThree()
  const lookAtRef = useRef(new THREE.Vector3())
  const arrivedRef = useRef(false)

  useEffect(() => {
    arrivedRef.current = false
  }, [target])

  useFrame(() => {
    if (!enabled || !target) return

    const offset = target.offset ?? new THREE.Vector3(0, 1.5, 2.5)
    const desiredPosition = target.position.clone().add(offset)

    camera.position.lerp(desiredPosition, 0.08)
    lookAtRef.current.lerp(target.position, 0.08)
    camera.lookAt(lookAtRef.current)

    const distance = camera.position.distanceTo(desiredPosition)

    if (!arrivedRef.current && distance < 0.05) {
      arrivedRef.current = true
      onArrive?.()
    }
  })

  return null
}