import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = () => {
  // const CardArray = [
  //   { image: images.nft_image_1, price: "0.5" },
  //   { image: images.nft_image_2, price: "0.7" },
  //   { image: images.nft_image_3, price: "0.9" },
  //   { image: images.nft_image_1, price: "0.5" },
  //   { image: images.nft_image_2, price: "0.7" },
  //   { image: images.nft_image_3, price: "0.9" },
  //   { image: images.nft_image_1, price: "0.5" },
  //   { image: images.nft_image_2, price: "0.7" },
  //   { image: images.nft_image_3, price: "0.9" },
  // ];

  const [like, setLike] = useState(true);

  const likeNft = () => {
    setLike(!like);
  };

  return (
    <div className={Style.NFTCard}>
      {CardArray.map((el, i) => (
        <Link href={{ pathname: `/nft-detail/${i + 1}` }}>
          <div className={Style.NFTCard_box} key={i + 1}>
            <div className={Style.NFTCard_box_img}>
              <Image
                src={el.image}
                alt="NFT images"
                width={600}
                height={600}
                className={Style.NFTCard_box_img_img}
              />
            </div>

            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left}>
                <div
                  className={Style.NFTCard_box_update_left_like}
                  onClick={likeNft}
                >
                  {like? (
                    <AiOutlineHeart />
                  ) : (
                    <AiFillHeart
                      className={Style.NFTCard_box_update_left_like_icon}
                    />
                  )}
                  {" "} 22
                </div>
              </div>

              <div className={Style.NFTCard_box_update_right}>
                <div className={Style.NFTCard_box_update_right_info}>
                  <small>Remaining time</small>
                  <p>3h : 15m : 20s</p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <div className={Style.NFTCard_box_update_details_price_box}>
                  <h4>NFT #{i + 1}</h4>

                  <div
                    className={Style.NFTCard_box_update_details_price_box_box}
                  >
                    <div
                      className={Style.NFTCard_box_update_details_price_box_bid}
                    >
                      <small>Current Bid</small>
                      <p>{el.price} ETH</p>
                    </div>
                    <div
                      className={Style.NFTCard_box_update_details_price_box_stock}
                    >
                      <small>61 in stock</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Style.NFTCard_box_update_details_category}>
                <BsImages />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;