import { useRef, useState, useEffect, ChangeEvent } from "react";
import plusIcon from "../../../assets/ic_plus.svg";
import deleteIcon from "../../../assets/ic_X.svg";
import deleteHoverIcon from "../../../assets/ic_X_hover.svg";

interface Props {
  imgFileUpload: (imgFile: FormData) => void;
  image?: string;
}

const ImageInput = ({ imgFileUpload, image = "" }: Props) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string>(image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImgFile(file);

      const formData = new FormData();
      formData.append("image", file);
      imgFileUpload(formData);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImgFile(null);
    setImgPreview("");
  };

  useEffect(() => {
    if (!imgFile) return;

    const nextPreview = URL.createObjectURL(imgFile);
    setImgPreview(nextPreview);

    return () => {
      setImgPreview("");
      URL.revokeObjectURL(nextPreview);
    };
  }, [imgFile]);

  return (
    <>
      <label htmlFor="item-image" className="first-label">
        상품 이미지
      </label>
      <input
        type="file"
        id="item-image"
        name="item-image"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <div className="image-container">
        <button
          type="button"
          className="image-btn"
          onClick={handleImageUploadClick}
        >
          <img src={plusIcon} alt="plusicon" />
          <span>이미지 등록</span>
        </button>
        {imgPreview && (
          <div className="preview-wrap">
            <img
              src={imgPreview || image}
              alt="이미지미리보기"
              className="image-preview"
            />
            <button
              type="button"
              className="image-delete"
              onClick={handleDeleteClick}
            >
              <img
                src={deleteIcon}
                alt="삭제아이콘"
                onMouseEnter={(e) =>
                  ((e.target as HTMLImageElement).src = deleteHoverIcon)
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLImageElement).src = deleteIcon)
                }
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageInput;
