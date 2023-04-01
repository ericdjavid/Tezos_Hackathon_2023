import { Canvas } from '@react-three/fiber'
import { Loader, Preload } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  const [load, setLoad] = useState(0);

  useEffect(() => {
    setLoad(1);
  }, [])

  if (load === 0) {
    return (
      <div className='text-center text-4xl'>
        loading...
      </div>
    )
  }
  else
    return (
      <Canvas
        className='canva scrollbar-hide'
        camera={{
          fov: 64,
          position: [2.3, 1.5, -6]
        }}
        {...props}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Preload all />
      </Canvas>
    )
}
