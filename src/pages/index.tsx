import dynamic from 'next/dynamic'
import Experience from '@/components/canvas/Experience'
import { Loader } from '@react-three/drei'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page(props) {

  return (
    <>
      <header>
        <title>BlockDeals - des deals des meilleurs partenaires</title>
      </header>
    </>

  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => (
  <>
    <Experience />
  </>
)

export async function getStaticProps() {
  return { props: { title: 'BlockDeals' } }
}
