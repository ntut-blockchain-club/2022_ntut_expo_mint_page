import { ethers } from "ethers";
import React from "react";

async function Metamask(set_address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const signer = provider.getSigner();
  console.log("ac: ", await signer.getAddress());
  if (accounts.length > 0) {
    const signer = provider.getSigner();
    set_address(accounts);
    
    // await window.ethereum.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [
    //       {
    //         chainId: "0x4"
    //       },
    //     ],
    //   });

    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            rpcUrls: ["https://rpc-mainnet.matic.quiknode.pro"],
            chainName: "Polygon Mainnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://polygonscan.com"],
          },
        ],
      });
    }
    return;
  }
  
//   console.log("ac: ", await signer.getAddress());

//   return;
// }

const Connect = () => {

    const [address, set_address] = React.useState("Connect to Metamask");
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    }
    catch {
       return (
        <div className="connect">
            <h1>No Metamask install!</h1>
            <a href="https://academy.binance.com/zt/articles/how-to-add-arbitrum-to-metamask">
                <span>Install Metamask</span>
            </a>
        </div>
    );
    }

    return (
        
        <div>
            <button onClick={() => {Metamask(set_address)}}>{address}</button>
        </div>
    )
}

export default Connect;
