import Image from 'next/image'
import VerifiedIcon from '@mui/icons-material/Verified'
import Marquee from './menu/Marquee'
import hackathon_img from 'public/img/nfthackathon.jpeg'
import lockpad from 'public/img/lockpad.webp'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { toast } from 'react-hot-toast'
import { useBookStore } from '@/store/bookStore'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './checkoutForm'
import {PaymentStatus} from "@/utils/variables";

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
  backgroundColor: 'rgb(28 25 23 / 1)',
  color: 'white',
  zIndex: '0',
}

export default function Expertises(props: any) {
  const amount = useBookStore((state) => state?.balance)
  const [change, setChange]: any = useState(null)
  const [error, setError]: any = useState(null)
  const [verified, setVerified]: any = useState(false)
  const [modalData, setModalData]: any = useState(null)
  const [data, setData] = useState(props.data)
  const [link, setLink] = useState<string | null>(null)
  const token = useBookStore((state) => {
    return state.token
  })
  const account = useBookStore(state=> state.id)

  const id = useBookStore((state) => state.id)
  const [paymentId, setPaymentId] = useState(null)

  const [clientSecret, setClientSecret]: any = useState('')

  const stripePromise = loadStripe(
    'pk_test_51Ms8N2DPRpXz3hgdPS0r0SuzXDLolvvarlf8MzF3khKt0xYwf0iS3Ic5w83dX7rVa6NTeS9cuFCFRklfKs7hpran00rKRnvo94',
  )

  // Stripe
  const appearance: any = {
    theme: 'stripe',
  }
  const options: any = {
    clientSecret,
    appearance,
  }

  async function handleBuy(the_id: string) {
    if (id === null) {
      toast.error("Error: vous n'etes pas connectés")
      return
    }
    try {
      const axios = require('axios')
      const res = await axios({
        method: 'post',
        url: `https://siahackaton.reskue-art.com/stripe/payment`,
        data: {
          productId: the_id,
        },
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token,
        },
      })
      setPaymentId(res?.data?.paymentId)
      setClientSecret(res?.data?.clientSecret)
      const evtSource = new EventSource(`https://siahackaton.reskue-art.com/stripe/sse/payment/${res?.data?.paymentId}`)
      evtSource.onmessage = function (e) {
        // if (e.data.status === PaymentStatus.CASHBACK_SENT) {
        //   setLink(`https://better-call.dev/search?text=${account}`)
        // }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // La modale qui apparaît au clic sur la carte partenaire
  const [open, setOpen] = useState(false)
  async function handleOpen(e: any) {
    try {
      const axios = require('axios')
      const res = await axios({
        method: 'get',
        url: `https://siahackaton.reskue-art.com/partner/${e.name}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setModalData(res)
    } catch (e: any) {
      console.error(e)
    }
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  async function handleClick() {
    if (change === null || change === '') setError('Le champs wallet ne peut etre vide')
    else if (change.length < 25 || change.length > 37) {
      toast.error('Format de wallet incompatible')
    } else if (change.substring(0, 2) != 'tz') {
      toast.error('Format de wallet incompatible')
    } else {
      setError(null)
      const axios = require('axios')
      try {
        const res = await axios({
          method: 'get',
          url: 'https://siahackaton.reskue-art.com/user/verify',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + token,
          },
          params: {
            tzWallet: change,
            eventName: 'Sia-Hackathon',
          },
        })
        setVerified(true)
        toast.success('NFT trouvé ! Vous pouvez accéder aux deals des partenaires et recevoir de la crypto ✌')
      } catch (e: any) {
        toast.error(e.response.data.message)
      }
    }
  }

  return (
    <div
      className='h-screen pt-10'
      style={
        {
          // opacity: props.opacity,
        }
      }>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {modalData?.data?.name}
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 0 }}>
              {modalData?.data?.description}
            </Typography>
            {/* <Image src={modalData?.lol} /> */}
            {modalData?.data?.products.length === 0 ? (
              <> Pas de produit partenaire pour l instant</>
            ) : (
              <div className='flex flex-col gap-2'>
                {/* TODO */}
                {modalData?.data?.products.map((e) => (
                  <>
                    <div className=' w-full lg:max-w-full lg:flex'>
                      {/* {e.name} */}
                      <Image
                        src={e.imageUrl}
                        className='flex-none w-auto h-full p-2 overflow-hidden text-center bg-cover rounded-3xl lg:rounded-t-none lg:rounded-l'
                        width={100}
                        height={100}
                        title='Mountain'
                        alt='alt'
                      />
                      <div className='flex flex-col justify-between p-4 leading-normal  lg:rounded-b-none lg:rounded-r'>
                        <div className='mb-8'>
                          <div className='mb-2 text-xl font-bold text-white'>{e.name}</div>
                          <p className='text-base text-green-100'>{e.description}</p>
                        </div>
                        <div className='pb-2 text-white'>{e.price} €</div>
                        <button className=' w-1/3 p-2 btn-semi-transparent' onClick={() => handleBuy(e.id)}>
                          Acheter
                        </button>
                        <div className=' w-full'>
                          {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                              <CheckoutForm />
                            </Elements>
                          )}
                          {/* <Image className="w-10 h-10 mr-4 rounded-full" src={e.imageUrl} width={100} height={100} alt="Avatar of Writer" />
                          <div className="text-sm">
                            <p className="leading-none text-gray-900">John Smith</p>
                            <p className="text-gray-600">Aug 18</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
          </Box>
        </Modal>
      </div>

      <h1 className='relative pb-2 mb-2 text-5xl text-center'> PARTENAIRES OFFICIELS</h1>
      <div className='px-8 pt-6 pb-8 mb-4 rounded shadow-md'>
        <div className='flex flex-col w-full mx-auto md:w-2/3 md:flex-row gap-4 md:gap-2'>
          <input
            className='w-full p-2 mx-2 leading-tight text-gray-700 border shadow appearance-none rounded-2xl md:w-2/3 focus:outline-none focus:shadow-outline btn-gradient-border'
            id='username'
            type='text'
            placeholder="Colle ton adresse de wallet et découvre les bons plans de l'event"
            onChange={(e) => setChange(e.target.value)}
          />
          {verified ? (
            <>
              <VerifiedIcon sx={{ color: '#07fd9a', fontSize: 40 }} />
            </>
          ) : (
            <>
              <button
                className='w-1/2 px-4 py-2 mx-auto font-bold rounded md:w-1/4 btn-semi-transparent btn-glow focus:outline-none focus:shadow-outline'
                type='button'
                onClick={handleClick}>
                Envoyer
              </button>
            </>
          )}
        </div>
        {error && <div className='w-2/3 p-2 mx-auto text-left text-red-500'>{error}</div>}
      </div>
      <div className='justify-center m-2 mb-4 md:flex md:flex-wrap md:flex-row h-80 md:mb-0 md:h-96'>
        {data.map((e) => (
          <div
            key={Math.random().toString(36).substring(7)}
            className='relative items-center w-3/4 h-full p-10 mx-auto mt-2 mb-6 border-white md:w-1/4 gap-2 md:m-10 min-h-min bg-stone-900 bg-opacity-90 rounded-md'>
            <h1 className='h-20 pb-4 text-4xl text-center align-middle'>{e.name}</h1>
            <span className='text-center bulle btn-glow'>+{e.maxCashback} XTZ</span>
            {verified === true ? (
              <>
                <Image
                  src={e.imageUrl ?? hackathon_img}
                  className='mb-4 ml-auto mr-auto'
                  alt='partners locked'
                  width={100}
                  height={50}
                />
                <p className=''>{e.description.length > 70 ? e.description.slice(0, 70) + '...' : e.description}</p>
                <button
                  className='px-4 py-2 my-3 font-bold rounded btn-semi-transparent btn-glow focus:outline-none focus:shadow-outline'
                  type='button'
                  onClick={() => handleOpen(e)}>
                  Claim
                </button>
              </>
            ) : (
              <>
                <Image src={lockpad} alt='partners' />
              </>
            )}
          </div>
        ))}
      </div>
      <Marquee />
    </div>
  )
}
