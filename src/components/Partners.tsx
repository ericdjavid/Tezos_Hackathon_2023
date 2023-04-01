import Image from "next/image"
import Marquee from "./menu/Marquee"
import img from "public/img/Exaion.png"
import img2 from "public/img/SIAXP.png"
import lockpad from "public/img/lockpad.webp"
import Link from "next/link"
import { useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from "react-hot-toast"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Expertises(props: any) {

  const [change, setChange]: any = useState(null)
  const [error, setError]: any = useState(null)
  const [verified, setVerified]: any = useState(false)
  const [modalData, setModalData]: any = useState(null)

  // modal
  const [open, setOpen] = useState(false);
  function handleOpen(e: any) {
    console.log(e)
    setModalData(e)
    // TODO: AXIOS REQUEST todo data ?
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  // const handleOpen = () => setOpen(true);

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
    else if (change.length < 25 || change.length > 37) {
      console.log(change.length)
      setError("La taille de wallet entré est trop petite ou trop grande")

    }
    else if (change.substring(0, 2) != "tz")
      setError("Mauvais format de wallet")
    else {
      setError(null)
      console.log(change)
      setVerified(true)
      toast.success('NFT trouvé ! Vous pouvez accéder aux deals des partenaires et recevoir de la crypto ✌')
    }
  }

  return (
    <div
      className="h-screen pt-10"
      style={{
        // opacity: props.opacity,
      }}
    >

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalData?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalData?.descr}
            </Typography>
            {/* <Image src={modalData?.lol} /> */}
          </Box>
        </Modal>
      </div>

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
            <span className="text-center bulle btn-glow">+{e.XTZ} XTZ</span>
            {verified === true ? (
              <>
                {/* <span className="bulle2 btn-gradient-border btn-glow text-center">-{e.XTZ} %</span> */}
                <Image src={e.src} className="mb-4 ml-auto mr-auto" alt="partners locked" placeholder="blur" width={100} height={50} />
                {/* <h1 className="text-4xl text-center">
            {e.name}
          </h1> */}
                <p className="">{e.descr}</p>
                <button className="px-4 py-2 my-3 font-bold rounded btn-semi-transparent btn-glow focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => handleOpen(e)}
                >
                  Claim
                </button>
              </>
            ) :
              (
                <>
                  <Image src={lockpad} alt="partners" />
                </>
              )}
          </div>))}

      </div>

      <Marquee />

    </div>
  )
}