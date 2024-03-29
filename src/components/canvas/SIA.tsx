/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/SIA.glb
*/
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function SIA(props) {
  const { nodes, materials }: any = useGLTF('./models/SIA.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Curve004.geometry} material={materials['Material.001']} rotation={[1.39, 0, 0]} />
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials['Material.002']}
        position={[0.36, 0.02, 0]}
        rotation={[-0.19, 0.04, 2.32]}
        scale={[-0.01, -0.02, 0]}
      />
    </group>
  )
}

useGLTF.preload('./models/SIA.glb')
