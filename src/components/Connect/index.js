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
    
    await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x4"
          },
        ],
      });

    // await window.ethereum.request({
    //     method: "wallet_addEthereumChain",
    //     params: [
    //       {
    //         chainId: "0x4",
    //         rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    //         chainName: "Rinkeby Test Network",
    //         nativeCurrency: {
    //           name: "RinkebyETH",
    //           symbol: "RinkebyETH",
    //           decimals: 18,
    //         },
    //         blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    //       },
    //     ],
    //   });
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
