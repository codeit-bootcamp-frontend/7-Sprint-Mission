import React, { useState, useRef, useEffect } from "react";
import styles from "./ConfirmPopup.module.scss";
import checkImg from "@/assets/images/icons/check.svg";

interface ConfirmPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  message,
  onConfirm,
  onCancel,
  confirmButtonText = "확인",
  cancelButtonText = "취소",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.content}>
        <div className={styles.checkContainer}>
          <img className={styles.check} src={checkImg} alt="check" />
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              onCancel();
              dialogRef.current?.close();
            }}
            className={styles.cancelButton}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              dialogRef.current?.close();
            }}
            className={styles.confirmButton}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export const useConfirm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [options, setOptions] = useState<
    Omit<ConfirmPopupProps, "onConfirm" | "onCancel">
  >({
    message: "",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  });

  const confirmRef = useRef<{ resolve: (value: boolean) => void } | null>(null);

  const handleConfirm = () => {
    if (confirmRef.current) {
      confirmRef.current.resolve(true);
      setIsVisible(false);
    }
  };

  const handleCancel = () => {
    if (confirmRef.current) {
      confirmRef.current.resolve(false);
      setIsVisible(false);
    }
  };

  const confirm = (
    message: string,
    confirmButtonText = "확인",
    cancelButtonText = "취소"
  ) => {
    setOptions({ message, confirmButtonText, cancelButtonText });
    setIsVisible(true);

    return new Promise<boolean>((resolve) => {
      confirmRef.current = { resolve };
    });
  };

  const ConfirmPopupComponent = isVisible ? (
    <ConfirmPopup
      message={options.message}
      confirmButtonText={options.confirmButtonText}
      cancelButtonText={options.cancelButtonText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return { confirm, ConfirmPopupComponent };
};
