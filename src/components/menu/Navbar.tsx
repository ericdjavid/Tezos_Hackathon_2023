import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useBookStore } from "@/store/bookStore";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { TezosToolkit } from "@taquito/taquito";
import { hex2buf } from "@taquito/utils";
import { InMemorySigner } from "@taquito/signer";
import axios from "axios";


const MENU_LIST = [
  // { text: "Home", href: "/" },
  // { text: "About Us", href: "/about" },
  // { text: "Contact us", href: "mailto:eric@reskue.art" },
  // { text: "About us", href: "/about" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  const amount = useBookStore(state => state.balance)
  const updateAmount = useBookStore(state => state.updateAmount)
  const id = useBookStore(state => state.id)
  const updateId = useBookStore(state => state.updateId)
  // const account = useBookStore(state => state.account)
  // const updateAccount = useBookStore(state => state.updateAccount)
  const email = useBookStore(state => state.mail)
  const updateMail = useBookStore(state => state.updateMail)
  const PK = useBookStore(state => state.privateKey)
  const updatePK = useBookStore(state => state.updatePrivateKey)
  const token = useBookStore(state => state.token)
  const updateToken = useBookStore(state => state.updateToken)


  const [user, setUser] = useState(null)

  const clientId = "BLwmxmUFExak3J96QU-Do99l1ti4wc2_wl61QcJ24LzrHY29S4OFUOq--tgZclQ0KEiDPo6Gqd5Ljabr4rzHYds";

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: "other", // for all non EVM and SOLANA chains, use "other"
            rpcTarget: "https://ghostnet.ecadinfra.com/",
            displayName: "Tezos",
            blockExplorer: "https://tzstats.com",
            ticker: "XTZ",
            tickerName: "Tezos",
          },
          web3AuthNetwork: "cyan",
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    // web3authProvider is web3auth.provider from above
    async function func() {
      const privateKey: any = await provider.request({ method: "private_key" });
      // derive the Tezos Key Pair from the private key
      const tezosCrypto = require("@tezos-core-tools/crypto-utils");
      const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(privateKey));
      updatePK(privateKey)

      // keyPair.pkh is the account address.
      const account = keyPair?.pkh;

      // updateAmount(await account.getBalance())
      // updateAccount(account)

      // console.log(account)
      updateId(account)
      updateMail(user.email)
      if (user?.idToken) {
        updateToken(user.idToken)
        console.log({
          email: account,
          account: id,
        })
        await axios.post("https://siahackaton.reskue-art.com/user/create", {
          email: email,
          account: account,
        }, {
          headers: {
            "Content-type": "application/json",
            "authorization": "Bearer " + user.idToken,
          }
        })
      }
    }

    if (user != null) {
      func()
    }
    // get balance of the account
    // const balance = await tezos.tz.getBalance(account);

  }, [user])


  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log("Logged in Successfully!");
    const user = await web3auth.getUserInfo(); // web3auth instance
    const tezos = new TezosToolkit("https://ghostnet.ecadinfra.com/");
    setUser(user)
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    updateAmount(null)
    updatePK(null)
    updateId(null)
    setUser(null)
  };

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          {/* <h1 className="logo">Reskue</h1> */}
          {/* <Image src="/RVB_WHITE.png" alt="logo of Reskue" width="30" height="30" /> */}
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          <h1>{id ? (id) : ("no connected")}</h1>
          {/* <h1> Crypto: {amount} </h1> */}
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          {id ? <button className="p-2 btn-semi-transparent" onClick={logout}>Logout</button>
            :
          <button className="p-2 btn-semi-transparent" onClick={login}>Login</button>
          }
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
