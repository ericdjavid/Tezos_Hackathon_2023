import dynamic from 'next/dynamic'
import Experience from '@/components/canvas/Experience'
import { Loader } from '@react-three/drei'
import axios from 'axios'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Logo = dynamic(() => import('@/components/canvas/Logo'), { ssr: false })

// Dom components go here
export default function Page({ data }) {

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
    <Experience {...props} />
  </>
)

export async function getServerSideProps() {
  const response = await axios.get('https://siahackaton.reskue-art.com/partner/all');

  // console.log(response)
  return {
    props: {
      data: response.data
      // data: "lolcat"
    }
  }
}
