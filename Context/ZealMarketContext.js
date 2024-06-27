import React, { useEffect, useState, useContext, Children } from 'eact';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Router, { useRouter } from "next/router";
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ZealMarketAddress, ZealMarketABI } from './constants';
import Link from 'next/link';


//const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
const projectId="";
const projectSecretKey='';
const auth=`Basic${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`

const router= useRouter();

const subdomain="your subdomain";

const client = ipfsHttpClient({
	host: "infura-ipfs.io",
	port: 5001,
	protocol: "http",
	headers: {
		authorization: auth,
	}
})


const fetchContract = (signerOrProvider) => new ethers.Contract(
	ZealMarketAddress,
	ZealMarketABI,
	signerOrProvider
 );

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong");
  }
}

export const ZealMarketContext = React.createContext();
export const ZealMarketProvider = ({ children }) => {
  const titleData = "Disccover";

  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkWalletConnected()
  }, [])

  const checkWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Install metamask")
      const accounts = await window.ethereum.request({ method: "eth_accounts" })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log("No account found")
      }
		//console.log(currentAccount);
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install metamask")
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });//forgot to add s
      setCurrentAccount(accounts[0])
      window.location.reload();
    } catch {
      console.log("Error while connecting the wallet")
    }
  }

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  const createNFT = async (formInput, fileUrl, router) => {
	try {
	  const { name, description, price } = formInput;
	  if (!name ||!description ||!price ||!fileUrl) return console.log("Missing data")

	  const data = JSON.stringify({ name, description, image: fileUrl })

	  try {
		 const added = await client.add(data);
		 const url = `http://ipfs.infura.io/ipfs/${added.path}`

		 await createSale(url, price)
	  } catch (error) {
		 console.log("Something went wrong");
	  }
	}

  }

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction =!isReselling? await contract.createToken(url, price, {
        value: listingPrice.toString()
      }) : await contract.reSellToken(url, price, {
        value: listingPrice.toString(),
      });
      await transaction.wait();
    } catch (error) {
      console.log("Error on creating sale");
    }
  }

  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItem();

      const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);

        const { data: { image, name, description } } = await axios.get(tokenURI);
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );

        return {
          price,
          tokenId: tokenId.toNumber(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        }
      }));
      return items;
    } catch (error) {
      console.log("error while fetching NFTs")
    }
  }

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data = type === "fetchItemsListed"? awaitcontract.fetchItemsListed(): await contract.fetchMyNFT();

      const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {

        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI)
        const price = ethers.utils.formatUnits(
          unformattedPrice.toString(),
          "ether"
        );
        return {
          price, tokenId: toNumber(),
          seller,
          owner,
          image,
          name, description, tokenURI,

        }
      }))
    } catch (error) {
      console.log("error while fetching");
    }
  }

  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price, toString(), "ether")
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      await transaction.wait();
		router.push('/author');

    } catch (error) {
      console.log("error while buying NFT");
    }
  }
  	useEffect(() => {
		fetchMyNFTsOrListedNFTs();
	},[]);

  return (
    <ZealMarketContext.Provider value={{ uploadToIPFS,createSale,checkWalletConnected, connectWallet, titleData, createNFT, fetchNFTs, fetchMyNFTsOrListedNFTs, currentAccount, buyNFT }}>
      {children}
    </ZealMarketContext.Provider>
  )
}

