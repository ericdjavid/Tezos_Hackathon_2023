import Image from "next/image"
import VerifiedIcon from '@mui/icons-material/Verified';
import Marquee from "./menu/Marquee"
import img from "public/img/Exaion.png"
import img2 from "public/img/SIAXP.png"
import hackathon_img from "public/img/nfthackathon.jpeg"
import lockpad from "public/img/lockpad.webp"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from "react-hot-toast"

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
  const [data, setData] = useState(props.data)

  // La modale qui apparaît au clic sur la carte partenaire
  const [open, setOpen] = useState(false);
  async function handleOpen(e: any) {
    try {
      const axios = require('axios');
      const res = await axios({
        method: 'get',
        url: `https://siahackaton.reskue-art.com/partner/${e.name}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setModalData(res)
    } catch (e: any) {
      console.error(e)
    }
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  async function handleClick() {
    if (change === null || change === "")
      setError("Pas de wallet entré")
    else if (change.length < 25 || change.length > 37) {
      toast.error('La taille de wallet entrée est trop petite ou trop grande')
    }
    else if (change.substring(0, 2) != "tz") {
      toast.error("Mauvais format de wallet")
    }
    else {
      setError(null)
      const axios = require('axios');
      try {
        const res = await axios({
          method: 'get',
          url: "https://siahackaton.reskue-art.com/user/verify",
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            tzWallet: change,
            eventName: "Sia-Hackathon"
          }
        });
        setVerified(true)
        toast.success('NFT trouvé ! Vous pouvez accéder aux deals des partenaires et recevoir de la crypto ✌')
      } catch (e: any) {
        toast.error(e.response.data.message)
      }
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
              {modalData?.data?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalData?.data?.description}
            </Typography>
            {/* <Image src={modalData?.lol} /> */}
            {modalData?.data?.products.length === 0 ? (<> Pas de produit partenaire pour l instant</>) : (
              <>
              </>)}
          </Box>
        </Modal>
      </div>

      <h1 className="pb-2 mb-2 text-5xl text-center"> PARTENAIRES OFFICIELS</h1>
      <div className="px-8 pt-6 pb-8 mb-4 rounded shadow-md">
        <div className="flex flex-col w-2/3 mx-auto md:flex-row gap-2">
          <input className="w-full p-2 mx-2 leading-tight text-gray-700 border shadow appearance-none rounded-2xl md:w-2/3 focus:outline-none focus:shadow-outline btn-gradient-border" id="username" type="text" placeholder="Colle ton adresse de wallet et découvre les bons plans de l'event"
            onChange={(e) => setChange(e.target.value)}
          />
          {
            verified ? (<>

              <VerifiedIcon sx={{ color: "#07fd9a", fontSize: 40 }} />
            </>) : (<>
              <button className="w-1/2 md:w-1/4 mx-auto px-4 py-2 font-bold rounded btn-semi-transparent btn-glow focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleClick}>
                Envoyer
              </button>
            </>)
          }
        </div>
        {error && (<div className="w-2/3 p-2 mx-auto text-left text-red-500">{error}</div>)}
      </div>
      <div className="flex flex-col flex-wrap justify-center m-2 md:flex-row">
        {data.map((e) => (
          <div key={Math.random().toString(36).substring(7)} className=" relative w-full h-full p-10 mt-2 mb-2 border-white md:w-1/4 md:m-10 min-h-min bg-stone-900 bg-opacity-90 rounded-md">
            <h1 className="pb-4 text-4xl text-center">{e.name}</h1>
            <span className="text-center bulle btn-glow">+{e.XTZ} XTZ</span>
            {verified === true ? (
              <>
                <Image src={e.src ?? hackathon_img} className="mb-4 ml-auto mr-auto" alt="partners locked" placeholder="blur" width={100} height={50} />
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