/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/TZ.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function TZ(props) {
  const { nodes, materials }: any = useGLTF('./models/TZ.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Curve.geometry} material={materials['SVGMat.001']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('./models/TZ.glb')
