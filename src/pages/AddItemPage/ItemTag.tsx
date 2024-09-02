import xIcon from "@/assets/images/icons/ic_x.svg";
import { ItemTagType } from "@/types/ProductTypes";

const ItemTag: React.FC<ItemTagType> = ({ value, onCancel }) => {
  function handleCencleClick() {
    onCancel(value);
  }

  return (
    <>
      <div className="tag-box">
        {value}
        <button className="cancel-button" onClick={handleCencleClick}>
          <img src={xIcon} alt="태그 삭제" />
        </button>
      </div>
    </>
  );
};

export default ItemTag;
