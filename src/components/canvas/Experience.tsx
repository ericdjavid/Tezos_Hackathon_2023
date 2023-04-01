import { Cloud, Effects, Grid, Html, MeshTransmissionMaterial, OrbitControls, Reflector, Scroll, ScrollControls, Sky, Sparkles, useFBO, useGLTF, useScroll, useTexture } from '@react-three/drei'
import { createPortal, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Overlay } from '../Overlay'
import Blob from './Blob'
import { Office } from './Office'
import styled from '@emotion/styled'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import * as THREE from 'three'
import { UnrealBloomPass } from 'three-stdlib'
import { Tezos } from './Tezos'
import { SIA } from './SIA'
import { TZ } from './TZ'

extend({ GlitchPass });
extend({ UnrealBloomPass })

export default function Experience(props: any) {

    const mouse = useRef([0, 0])
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    function Rig({ children }) {
        const ref: any = useRef()
        const vec = new THREE.Vector3()
        const { camera, mouse } = useThree()
        useFrame(() => {
            camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
            ref.current.position.lerp(vec.set(mouse.x * 1, -mouse.y * 0.5, 0), 0.1)
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
        })
        return <group ref={ref}>{children}</group>
    }
    const PAGES = 5

    return (
        <>
            {/* <OrbitControls enableZoom={false} /> */}
            <ambientLight />
            <ScrollControls pages={PAGES} damping={0.3} horizontal={false}  >
                <color attach="background" args={['black']} />
                <Overlay pages={PAGES} {...props} />
                {/* <Office /> */}
                <EffectComposer>
                    <Bloom />
                    <Rig>
                        <Tezos rotation={[Math.PI / 15, Math.PI / 1, 0]} scale={isMobile ? [1.6, 1.6, 1.6] : [8, 8, 8]} position={[isMobile ? 1 : 5, -2, 0]} />
                        {/* <TZ rotation={[Math.PI / 15, Math.PI / 1, 0]} scale={isMobile ? [1.7, 1.7, 1.7] : [8, 8, 8]} position={[isMobile ? -1.5 : 5, -2, 0]} /> */}
                        <SIA rotation={[Math.PI / 50, Math.PI / 2, 0]} scale={ [15, 15, 15]} position={[isMobile ? -1.5 : -5, -2, isMobile ? 5 : 3.8]} />
                        <Grid infiniteGrid={true} position={[0, -3, 0]} fadeDistance={50} {...props} />
                    </Rig>
                </EffectComposer>
            </ScrollControls>
        </>
    )
}
