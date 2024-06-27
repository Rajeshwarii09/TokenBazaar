import React from 'react'
import Style  from "./Loder.module.css"
import images from "../../img"
const Loader = () => {
  return (
	 <div className={Style.Loader}>
		<div className={Style.Loader_box}>
			<div className={Style.Loader_box_img}>
				<Image src={images.logo} alt="loader" width={250} height={200}
				/>

			</div>

		</div>
	 </div>
  )
}

export default Loader