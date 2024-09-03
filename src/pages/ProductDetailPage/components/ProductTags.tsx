const ProductTags = ({ tag }: { tag: string }) => {
  return (
    <>
      <span className="productTags">#{tag} </span>
    </>
  );
};

export default ProductTags;
