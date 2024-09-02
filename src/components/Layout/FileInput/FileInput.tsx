import { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import logoImg from "@/assets/images/icons/ic_plus.svg";
import xIcon from "@/assets/images/icons/ic_x.svg";
import { FileInputType } from "@/types/CommonTypes";
import styles from "./FileInput.module.scss";

const FileInput: React.FC<FileInputType> = ({ value, onChange, className }) => {
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target?.files?.[0];
    if (nextValue) {
      onChange(nextValue);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  return (
    <section className={`${styles["file-input-section"]} ${className}`}>
      <div className={styles["file-input-wrapper"]}>
        <input
          ref={inputRef}
          className={styles["file-input"]}
          type="file"
          accept="image/png, image/jpeg, image/gif, image/svg+xml, application/pdf, image/webp"
          onChange={handleChange}
        />
        <div className={styles["add-image-wrapper"]}>
          <img className={styles["add-img"]} src={logoImg} alt="추가하기" />
          <span>이미지 등록</span>
        </div>
      </div>
      {value && (
        <div className={styles["preview-image-wrapper"]}>
          <img
            className={styles["preview-image"]}
            src={preview}
            alt="이미지 미리보기"
            width={162}
            height={162}
          />
          <button
            className={styles["cancel-button"]}
            onClick={handleClearClick}
          >
            <img src={xIcon} alt="이미지 삭제" />
          </button>
        </div>
      )}
    </section>
  );
};

export default FileInput;
