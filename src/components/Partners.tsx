import Image from "next/image"
import Marquee from "./menu/Marquee"
import img from "public/img/Exaion.png"
import img2 from "public/img/SIAXP.png"
import img3 from "public/img/03_3D.png"
import Link from "next/link"
import { useState } from "react"

export default function Expertises(props: any) {

  const [change, setChange]: any = useState(null)
  const [error, setError]: any = useState(null)

  const ELEMS = [
    { name: "Exaion Node", src: img, descr: "X% de discount", XTZ: "5" },
    { name: "SIA Partners", src: img2, descr: "Une formation d'une journée dispensée par les meilleurs experts strat de SIA Partners", XTZ: "10" },
    { name: "SIA Partners", src: img2, descr: "Une formation d'une journée dispensée par les meilleurs experts strat de SIA Partners", XTZ: "10" },
    { name: "SIA Partners", src: img2, descr: "Une formation d'une journée dispensée par les meilleurs experts strat de SIA Partners", XTZ: "10" },
    { name: "SIA Partners", src: img2, descr: "Une formation d'une journée dispensée par les meilleurs experts strat de SIA Partners", XTZ: "10" },
  ]

  function handleClick() {
    if (change === null || change === "")
      setError("Pas de wallet entré")
    else if (change.length < 25 || change.length > 35)
      setError("La taille de wallet entré est trop petite ou trop grande")
    else if (change.substring(0, 2) != "tz")
      setError("Mauvais format de wallet")
    else {
      setError(null)
      console.log(change.length)
      console.log(change)
    }
  }

  return (
    <div
      className="h-screen pt-10"
      style={{
        // opacity: props.opacity,
      }}
    >

      <h1 className="pb-2 mb-2 text-5xl text-center">PARTENAIRES OFFICIELS</h1>
      <div className="px-8 pt-6 pb-8 mb-4 rounded shadow-md">
        <div className="flex flex-col w-2/3 mx-auto md:flex-row gap-2">

          <input className="w-full p-0 mx-2 leading-tight text-gray-700 border rounded shadow appearance-none md:w-2/3 md:p-2 focus:outline-none focus:shadow-outline btn-gradient-border" id="username" type="text" placeholder="Colle ton adresse de wallet et découvre les bons plans de l'event"
            onChange={(e) => setChange(e.target.value)}
          />
          <button className="px-4 py-2 font-bold rounded btn-semi-transparent btn-glow focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleClick}
          >
            Envoyer
          </button>
        </div>
        {error && (<div className="w-2/3 p-2 mx-auto text-left text-red-500">{error}</div>)}
      </div>
      <div className="flex flex-col flex-wrap justify-center m-2 md:flex-row">
        {ELEMS.map((e) => (
          <div key={Math.random().toString(36).substring(7)} className=" relative w-full h-full p-10 mt-2 mb-2 border-white md:w-1/4 md:m-10 min-h-min bg-stone-900 bg-opacity-90 rounded-md">
            <h1 className="pb-4 text-4xl text-center">{e.name}</h1>
            <span className="bulle btn-glow text-center">{e.XTZ} XTZ</span>
            <Image src={e.src} className="mb-4 ml-auto mr-auto" alt="services" placeholder="blur" width={100} height={50} />
            {/* <h1 className="text-4xl text-center">
            {e.name}
          </h1> */}
            <p className="">{e.descr}</p>
          </div>))}

      </div>

      <Marquee />

    </div>
  )
}