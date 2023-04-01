import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import Navbar from '@/components/menu/Navbar'
import { useFrame, useThree } from '@react-three/fiber'
import { Toaster } from 'react-hot-toast'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()

  useEffect(() => {
    document.addEventListener('mousemove', function (e) {
      document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
    });
  }, [])

  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>
        <Toaster />
        <Navbar />
        {/* <Cursor mouseP={mousePos} /> */}
        <Component {...pageProps} />
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
        * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          // <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
          <>
            <Scene>
              {Component.canvas(pageProps)}
            </Scene>
          </>
        )}

        <div className='cursor'></div>
      </Layout>
    </>
  )
}
