import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { RiLogoutCircleLine, RiFileCopy2Line } from "react-icons/ri";
import styles from "../../styles/Theme.module.scss";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
<>
        {address ? (
          <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
     <div className="container-fluid">
      <div className={styles.left}>
        <Link href="/" passHref>
          <Image
            src={`/thirdweb.svg`}
            alt="Thirdweb Logo"
            className={styles.headerLogo}
            width={40}
            height={24}
          />
        </Link>
            <span className="mx-1 btn btn-sm btn-outline-light shadow" data-bs-toggle="dropdown"> {address.slice(0, 2).concat("-").concat(address.slice(-4))}</span>
<ul className="dropdown-menu" style={{maxWidth: "100%", width: 380, height: 200}}>
    <li className="px-2">Contract Number {copySuccess}</li>
    <li className={styles.itemLi}>
      <form>
        <textarea
          className={styles.textForm}
          cols="28" rows="2"
          ref={textAreaRef}
          value='0x9B45233CB9ecA509a278A9eD406578E8eEb15d17'
        />
      </form>
      {
       document.queryCommandSupported('copy') &&
        <div className="btn btn-default p-0">
          <RiFileCopy2Line size={32} cursor="pointer" onClick={copyToClipboard} title="Copy Contract" /> 
        </div>
      }
    </li>
<li className="px-2">
            <span>your Wallet Address:</span>
          <p className="fs-6"><small className="text-wrap" style={{width:80}}>{address}</small></p>
</li>
  </ul>
      </div>

      <div className={styles.right}>
        {address ? (
          <>
        <Link href="/resell_nft">
          <a className="btn btn-sm btn-outline-light shadow">Resell NFT</a>
        </Link>
        <Link href="/create_sell">
          <a className="btn btn-sm btn-outline-light shadow">Create Sell</a>
        </Link>
            <RiLogoutCircleLine className="btn btn-sm btn-outline-light p-1 shadow" size={32} cursor="pointer" onClick={disconnectWallet} title="disconnect" />
          </>
        ) : (
          <a
            className={styles.hidden}
            onClick={() => connectWithMetamask()}
          >
            Connect Wallet
          </a>
        )}
      </div>
     </div>
    </nav>
          </>
        ) : (
<>
</>
        )}
</>
  );
}
