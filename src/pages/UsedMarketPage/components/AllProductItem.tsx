import React, { useState, useEffect } from "react";
import favoriteImg from "@/assets/images/icons/ic_heart.svg";
import noImg from "@/assets/images/icons/no_img.svg";
import { Item } from "@/types/ProductTypes";
import { checkImageExists } from "@/utils/Utils";
import LoadingSpinner from "@/components/Layout/LoadingSpinner";

interface AllProductItemProps {
  item: Item;
}

const AllProductItem: React.FC<AllProductItemProps> = ({
  item: { price, id, images, name, favoriteCount },
}) => {
  const [imageSrc, setImageSrc] = useState<string>(noImg);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);

      if (images) {
        const isValidImage = await checkImageExists(images);
        setImageSrc(isValidImage ? images : noImg);
      } else {
        setImageSrc(noImg);
      }

      setIsLoading(false);
    };

    loadImage();
  }, [images]);

  const bestPrice = price.toLocaleString();

  return (
    <li className="list all-list" key={id}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <img className="item-image all-item" src={imageSrc} alt={name} />
      )}
      <div className="item-content">
        <span id="item-name">{name}</span>
        <span id="item-price">{bestPrice}원</span>
        <div className="favorite-area">
          <img id="favorite-image" src={favoriteImg} alt="좋아요 이미지" />
          <div id="item-favorite">{favoriteCount}</div>
        </div>
      </div>
    </li>
  );
};

export default AllProductItem;
