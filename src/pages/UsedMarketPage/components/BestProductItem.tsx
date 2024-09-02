import React, { useState, useEffect } from "react";
import favoriteImg from "@/assets/images/icons/ic_heart.svg";
import noImg from "@/assets/images/icons/no_img.svg";
import { Item } from "@/types/ProductTypes";
import { checkImageExists } from "@/utils/Utils";
import LoadingSpinner from "@/components/Layout/LoadingSpinner";

interface BestProductItemProps {
  item: Item;
}

const BestProductItem: React.FC<BestProductItemProps> = ({ item }) => {
  const [imageSrc, setImageSrc] = useState<string>(noImg);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bestPrice = item.price.toLocaleString();

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);

      if (item.images) {
        const isValidImage = await checkImageExists(item.images);
        setImageSrc(isValidImage ? item.images : noImg);
      } else {
        setImageSrc(noImg);
      }

      setIsLoading(false);
    };

    loadImage();
  }, [item.images]);

  return (
    <li className="list" key={item.id}>
      <div className="item-image-wrapper">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <img className="item-image" src={imageSrc} alt={item.name} />
        )}
      </div>
      <div className="item-content">
        <span id="item-name">{item.name}</span>
        <span id="item-price">{bestPrice}원</span>
        <div className="favorite-area">
          <img id="favorite-image" src={favoriteImg} alt="즐겨찾기 하트" />
          <div id="item-favorite">{item.favoriteCount}</div>
        </div>
      </div>
    </li>
  );
};

export default BestProductItem;
