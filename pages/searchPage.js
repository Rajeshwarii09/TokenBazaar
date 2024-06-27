import React from "react";

import Loader from "../components/componentsindex";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";


  


const searchPage = () => {

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts]=useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);


  useEffect(()=>{
    fetchNFTs().then((item)=>{
      setNftsCopy(item.reverse());
      setNftsCopy(item)
     // console.log(nfts);
    })
  });

  const onHandleSearch= (value)=>{
    const filteredNFTS = nfts.filter(({name})=>
    name.toLowerCase().includes(value.toLowerCase()));
  }

  if(filteredNFTs.length===0){
    setNfts(nftsCopy);
  }
  else{
    setNftsCopy(filteredNFTS);
  }}

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  const onClearSearch = () => {
    if(nfts.length && nftsCopy.length){
      setNfts(nftsCopy)
    }
  }

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar onHandleSearch={onHandleSearch}/>
      <Filter />
      {
        nfts.length==0 ? <Loader/> : <NFTCardTwo NFTData={nfts} />
      }
      
      <Slider />
      <Brand />
    </div>
  );


export default searchPage;
