import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { Web3Auth } from "@web3auth/modal";
import * as tezosCrypto from "@tezos-core-tools/crypto-utils";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { TezosToolkit } from "@taquito/taquito";
import { hex2buf } from "@taquito/utils";
import { InMemorySigner } from "@taquito/signer";
import {RPC_URL} from "@/variables/variables";
import {server} from "jayson";

const MENU_LIST = [
  // { text: "Home", href: "/" },
  // { text: "About Us", href: "/about" },
  { text: "Contact us", href: "mailto:eric@reskue.art" },
  // { text: "About us", href: "/about" },
];


const Navbar = () => {
  const [navActive, setNavActive] = useState<boolean | null>(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  // todo global state
  const [user, setUser] = useState<any | null>()

  const clientId = "BLwmxmUFExak3J96QU-Do99l1ti4wc2_wl61QcJ24LzrHY29S4OFUOq--tgZclQ0KEiDPo6Gqd5Ljabr4rzHYds";

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: "other", // for all non EVM and SOLANA chains, use "other"
            rpcTarget: RPC_URL,
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

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log("Logged in Successfully!");
    return web3authProvider;
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    return user;
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setUser(null);
  };

  const getAccounts = async (web3authProvider) => {
    const tezos = new TezosToolkit(RPC_URL);
    /*
      Use code from the above Initializing Provider here
    */

// web3authProvider is web3auth.provider from above
    const privateKey = await web3authProvider.request({ method: "private_key" });

// derive the Tezos Key Pair from the private key
    const keyPair = tezosCrypto.utils.seedToKeyPair(hex2buf(privateKey));
    console.log(keyPair)

// keyPair.pkh is the account address.
    const account = keyPair?.pkh;
    console.log(account)

// get balance of the account
    const balance = await tezos.tz.getBalance(account);
    return account;
  }

  const flow = async () => {
    // const infos = {
    //
    // }
    const w3authProvider = await login()
    await authenticateUser()
    const infos = await getUserInfo()
    const acc = await getAccounts(w3authProvider)
    // await onGetTezosKeyPair()
    // await getAccounts()
    setUser({
      address: acc,
      ...infos
    })
    console.log(user)
  }

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
          { user ? <div><p>{user.address}</p><button className="p-2 btn-semi-transparent" onClick={logout}>Logout</button></div>:
          <button className="p-2 btn-semi-transparent" onClick={flow}>Login</button>
          }
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
