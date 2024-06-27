import React, { useContext, useState } from 'react'
import Style from " ../styles/reSellToken"
import formStyle from"../AccountPage/Form/Form.module.css"
import { useRouter } from 'next/router'
import { Button } from '../components/componentsindex'
import axios from 'axios'
import Image from 'next/image'

import { ZealMarketContext } from '../Context/ZealMarketContext'

const reSellToken = () => {
	const{ createSale} = useContext(ZealMarketContext);
	const [price,setPrice] = useState("");
	const [image, setImage] = useState("");
	const router= useRouter();
	const {id, tokenURI} = router.query;

	const fetchNFT= async()=>{
		if(!tokenURI) return ;

		const {data} = await axios.get(tokenURI);

		setPrice(data.price);

		setImage(data.image);
	}

	useEffect(()=>{
		fetchNFT();
	},[id])

	const resell = async()=>{
		await createSale(tokenURI, price, true, id);
		router.push("/auhtor")
	}

  return (
	 <div className={Style.reSellToken}>
		<div className={Style.reSellToken_box}>
			<h1>Resell your Token</h1>
			<div className={formStyle.Form_box_input}>
				<label htmlFor='name'>Price</label>
				<input type='number'
				placeholder='reSellPrice'
				className={formStyle.Form_box_input_userName}/>
			</div>

			<div className={Style.reSellToken_box_image}>
				{
					image && (<Image src={image} alt="resell nft" width={400} height={600}/>)
				} 
				
				
			</div>

			<div>
				<Button btnName="Resell NFT" handleClick={resell}/>
			</div>

		</div>
	 </div>
  )
}

export default reSellToken