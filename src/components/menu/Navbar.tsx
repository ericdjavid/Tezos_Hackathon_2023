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

      // keyPair.pkh is the account address.
      const account = keyPair?.pkh;

      console.log(account)
      updateId(account)

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
    setUser(user)
    console.log(user)
    const tezos = new TezosToolkit("https://ithacanet.ecadinfra.com");
    /*
      Use code from the above Initializing Provider here
    */


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

          <button
            onClick={() => updateAmount(10)}
          > Update Amount </button>
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
          <button className="p-2 btn-semi-transparent" onClick={login}>Log the fucking in</button>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;