import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Web3Auth } from '@web3auth/modal'
import { useBookStore } from '@/store/bookStore'
import { TezosToolkit } from '@taquito/taquito'
import { hex2buf } from '@taquito/utils'
import axios from 'axios'

const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null)
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] = useState<any | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const amount = useBookStore((state) => state.balance)
  const updateAmount = useBookStore((state) => state.updateAmount)
  const id = useBookStore((state) => state.id)
  const updateId = useBookStore((state) => state.updateId)
  const updateMail = useBookStore((state) => state.updateMail)
  const updatePK = useBookStore((state) => state.updatePrivateKey)
  const updateToken = useBookStore((state) => state.updateToken)

  const clientId = 'BLwmxmUFExak3J96QU-Do99l1ti4wc2_wl61QcJ24LzrHY29S4OFUOq--tgZclQ0KEiDPo6Gqd5Ljabr4rzHYds'

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: 'other', // for all non EVM and SOLANA chains, use "other"
            rpcTarget: 'https://ghostnet.ecadinfra.com/',
            displayName: 'Tezos',
            blockExplorer: 'https://tzstats.com',
            ticker: 'XTZ',
            tickerName: 'Tezos',
          },
          web3AuthNetwork: 'cyan',
        })
        setWeb3auth(web3auth)
        await web3auth.initModal()
        if (web3auth.provider) {
          setProvider(web3auth.provider)
        }
      } catch (error) {
        console.error(error)
      }
    }
    init()
  }, [])

  useEffect(() => {
    // web3authProvider is web3auth.provider from above
    async function func() {
      const privateKey: any = await provider.request({ method: 'private_key' })
      // derive the Tezos Key Pair from the private key
      const tezosCrypto = require('@tezos-core-tools/crypto-utils')
      const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(privateKey))
      updatePK(privateKey)
      const account = keyPair?.pkh
      updateId(account)
      updateMail(user.email)
      if (user?.idToken) {
        updateToken(user.idToken)
        await axios.post(
          'https://siahackaton.reskue-art.com/user/create',
          {
            email: user.email,
            account: account,
          },
          {
            headers: {
              'Content-type': 'application/json',
              authorization: 'Bearer ' + user.idToken,
            },
          },
        )
      }
    }
    if (user != null) {
      func()
    }
  }, [user])

  const login = async () => {
    if (!web3auth) {
      console.error('web3auth not initialized yet')
      return
    }
    const web3authProvider = await web3auth.connect()
    setProvider(web3authProvider)
    const usr = await web3auth.getUserInfo() // web3auth instance
    const tezos = new TezosToolkit('https://ghostnet.ecadinfra.com/')
    setUser(usr)
  }

  const logout = async () => {
    if (!web3auth) {
      console.error('web3auth not initialized yet')
      return
    }
    await web3auth.logout()
    setProvider(null)
    updateAmount(null)
    updatePK(null)
    updateId(null)
    setUser(null)
  }

  return (
    <header>
      <nav className={`nav`}>
        <Link href={'/'}></Link>
        <div onClick={() => setNavActive(!navActive)} className={`nav__menu-bar`}></div>
        <div className={`${navActive ? 'active' : ''} nav__menu-list`}>
          <h1>{id ? id : 'Offline'}</h1>
          {id ? (
            <button className='p-2 btn-semi-transparent' onClick={logout}>
              Logout
            </button>
          ) : (
            <button className='p-2 btn-semi-transparent' onClick={login}>
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
