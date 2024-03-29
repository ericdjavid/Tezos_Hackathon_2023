/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/models/Tezos.glb
*/

import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

export function Tezos(props) {
  const { nodes, materials }: any = useGLTF('./models/Tezos.glb')

  const ref: any = useRef()
  const tl: any = useRef()
  const camera = useThree((state) => state.camera)

  const scroll = useScroll()

  useFrame((state: any) => {
    tl.current.seek(scroll.offset * tl.current.duration())
  })

  useLayoutEffect(() => {
    tl.current = gsap.timeline()

    tl.current.to(camera.position, { duration: 3, x: 0, y: 0, z: -1 }, 0)

    tl.current.to(ref.current.position, { duration: 2, y: 0.4 }, 0)

    tl.current.to(ref.current.position, { duration: 2, z: 25 }, 0.45)

    tl.current.to(ref.current.rotation, { duration: 1, x: 0, y: -Math.PI / 6, z: 0 }, 0.45)

    // tl.current.to(
    //   ref.current.rotation,
    //   { duration: 1, x: Math.PI / 6, y: Math.PI / 6, z: Math.PI / 6 },
    //   1
    // );
  }, [])
  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh geometry={nodes.Curve.geometry} material={materials['SVGMat.001']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('./models/Tezos.glb')
