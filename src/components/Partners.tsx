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
import zIndex from "@mui/material/styles/zIndex";
import { useBookStore } from "@/store/bookStore";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflox: 'scroll',
  backgroundColor: "rgb(28 25 23 / 1)",
  color: 'white',
  zIndex: '0'
};

export default function Expertises(props: any) {

  const amount = useBookStore(state => state?.balance)
  const [change, setChange]: any = useState(null)
  const [error, setError]: any = useState(null)
  const [verified, setVerified]: any = useState(false)
  const [modalData, setModalData]: any = useState(null)
  const [data, setData] = useState(props.data)

  // console.log(modalData?.data?.products)

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
            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
              {modalData?.data?.description}
            </Typography>
            {/* <Image src={modalData?.lol} /> */}
            {modalData?.data?.products.length === 0 ? (<> Pas de produit partenaire pour l instant</>) : (
              <div className="flex flex-col gap-2">
                {/* TODO */}
                {modalData?.data?.products.map((e) => (
                  <>
                    <div className=" w-full lg:max-w-full lg:flex">
                    {/* {e.name} */}
                      <Image src={e.imageUrl} className="flex-none overflow-hidden text-center rounded-3xl bg-cover p-2 h-full w-auto lg:rounded-t-none lg:rounded-l" width={100} height={100} title="Mountain" alt="alt" />
                      <div className="flex flex-col justify-between p-4 leading-normal  lg:rounded-b-none lg:rounded-r">
                        <div className="mb-8">
                          {/* <p className="flex items-center text-sm text-gray-600">
                            <svg className="w-3 h-3 mr-2 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Members only
                          </p> */}
                          <div className="mb-2 text-xl font-bold text-white">{e.name}</div>
                          <p className="text-base text-green-100">{e.description}</p>
                        </div>
                        <div className="text-white pb-2">{e.price} €</div>
                    <button className=" w-1/3 p-2 btn-semi-transparent" >Acheter</button>
                        <div className="flex items-center">
                          <Image className="w-10 h-10 mr-4 rounded-full" src={e.imageUrl} width={100} height={100} alt="Avatar of Writer" />
                          <div className="text-sm">
                            <p className="leading-none text-gray-900">John Smith</p>
                            <p className="text-gray-600">Aug 18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>)}
          </Box>
        </Modal>
      </div>

      <h1 className="relative pb-2 mb-2 text-5xl text-center"> PARTENAIRES OFFICIELS</h1>
      <div className="px-8 pt-6 pb-8 mb-4 rounded shadow-md">
        <div className="flex flex-col w-full md:w-2/3 mx-auto md:flex-row gap-4 md:gap-2">
          <input className="w-full p-2 mx-2 leading-tight text-gray-700 border shadow appearance-none rounded-2xl md:w-2/3 focus:outline-none focus:shadow-outline btn-gradient-border" id="username" type="text" placeholder="Colle ton adresse de wallet et découvre les bons plans de l'event"
            onChange={(e) => setChange(e.target.value)}
          />
          {
            verified ? (<>
              <VerifiedIcon sx={{ color: "#07fd9a", fontSize: 40 }} />
            </>) : (<>
              <button className="w-1/2 px-4 py-2 mx-auto font-bold rounded md:w-1/4 btn-semi-transparent btn-glow focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleClick}>
                Envoyer
              </button>
            </>)
          }
        </div>
        {error && (<div className="w-2/3 p-2 mx-auto text-left text-red-500">{error}</div>)}
      </div>
      <div className=" md:flex md:flex-wrap justify-center m-2 md:flex-row h-80 mb-4 md:mb-0 md:h-96">
        {data.map((e) => (
          <div key={Math.random().toString(36).substring(7)} className=" relative w-3/4 md:w-1/4 gap-2 h-full p-10 mt-2 mb-6 border-white md:w-1/4 md:m-10 min-h-min bg-stone-900 bg-opacity-90 rounded-md items-center mx-auto">
            <h1 className="pb-4 text-4xl text-center h-20 align-middle">{e.name}</h1>
            <span className="text-center bulle btn-glow">+{e.maxCashback} XTZ</span>
            {verified === true ? (
              <>
                <Image src={e.imageUrl ?? hackathon_img} className="mb-4 ml-auto mr-auto" alt="partners locked" width={100} height={50} />
                <p className="">{e.description.length > 70 ? (e.description.slice(0, 70) + "...") : (e.description)}</p>
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