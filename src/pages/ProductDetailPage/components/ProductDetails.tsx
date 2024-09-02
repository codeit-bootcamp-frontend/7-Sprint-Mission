import { useState, useEffect } from "react";
import ProductInformation from "./ProductInformation";
import { ProductDetailType } from "@/types/ProductTypes";
import noImg from "@/assets/images/icons/no_img.svg";
import { checkImageExists } from "@/utils/Utils";
import LoadingSpinner from "@/components/Layout/LoadingSpinner";

const ProductDetails = ({
  productDetails,
}: {
  productDetails: ProductDetailType;
}) => {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateImage = async () => {
      setIsLoading(true);
      const mainImage = productDetails.images[0];

      if (mainImage) {
        const isValidImage = await checkImageExists(mainImage);
        setProductImage(isValidImage ? mainImage : noImg);
      } else {
        if (!isLoading) setProductImage(noImg);
      }

      setIsLoading(false);
    };

    validateImage();
  }, [productDetails.images]);

  return (
    <div className="productDetailsWrapper">
      <div className="productDetails">
        {isLoading ? (
          <div className="loadingContainer">
            <LoadingSpinner />
          </div>
        ) : (
          productImage && (
            <img id="productImage" src={productImage} alt="상품 이미지" />
          )
        )}
        <ProductInformation productDetails={productDetails} />
      </div>
      <div id="centerLine" className="dividerLine"></div>
    </div>
  );
};

export default ProductDetails;
