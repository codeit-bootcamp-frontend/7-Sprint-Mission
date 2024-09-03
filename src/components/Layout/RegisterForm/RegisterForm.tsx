import { FormEvent, useEffect, useState } from "react";
import InputField from "./InputField";
import Button from "../Button";
import {
  RegisterFormProps,
  HandleChange,
  FormValues,
} from "@/types/RegisterTypes";
import { FIELDTYPE } from "./registerConfig";
import styles from "./RegisterForm.module.scss";
import { ArticlePostData } from "@/types/ArticleTypes";
import useAddAndEditProduct from "@/hooks/useAddAndEditProduct";
import { useLocation } from "react-router-dom";
import { PRODUCT_FIELDTYPE } from "@/pages/ProductDetailPage/components/ProductDetailConfig";
import { CommentPostData } from "@/types/ProductTypes";
import { ARTICLE_FIELDTYPE } from "@/pages/BoardPage/BoardDetailConfig";

const RegisterForm: React.FC<RegisterFormProps> = ({
  titleText = "",
  buttonText = "등록",
  fields,
  bottomButton = false,
  href = "",
}) => {
  const location = useLocation();
  const initializeFormValues = () => {
    const initialValues: FormValues = {};
    Object.values(fields).forEach((field) => {
      initialValues[field.id] = field.type === "file" ? null : "";
    });
    return initialValues;
  };

  const addProduct = useAddAndEditProduct({
    onSuccessRedirectUrl: "/boards",
    productUrl: "articles",
  });

  const [urlId, setUrlId] = useState<number | null>(null);

  useEffect(() => {
    const match = location.pathname.match(/\/(\d+)$/);
    if (match) {
      setUrlId(Number(match[1]));
    } else {
      setUrlId(null);
    }
  }, [location.pathname]);

  const productUrl = location.pathname.startsWith("/items")
    ? `/products/${urlId}/comments`
    : `/articles/${urlId}/comments`;

  const addComment = useAddAndEditProduct({
    onSuccessRedirectUrl: "",
    productUrl,
    queryKey: "comments",
  });

  const [formValues, setFormValues] = useState<FormValues>(
    initializeFormValues()
  );
  const [isValid, setIsValid] = useState(false);

  const handleChange: HandleChange = (e) => {
    if (e instanceof File || e === null) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [FIELDTYPE.IMAGE]: e,
      }));
    } else {
      const target = e.target;
      const { name, value } = target;
      if (name in formValues) {
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value.trim(),
        }));
      }
    }
  };

  const handleBlur = () => {
    const filteredFields = Object.entries(formValues).filter(
      ([key]) => key !== FIELDTYPE.IMAGE
    );

    const result = filteredFields.every(
      ([_, value]) => value !== null && value !== ""
    );

    setIsValid(result);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (location.pathname === "/addboard") {
      const ArticleData: ArticlePostData = {
        image: null,
        content: formValues[FIELDTYPE.CONTENT] as string,
        title: formValues[FIELDTYPE.TITLE] as string,
      };

      addProduct.mutate({
        productData: ArticleData,
        file: formValues[FIELDTYPE.IMAGE] as File | null,
      });
    } else {
      const commentData: CommentPostData = {
        content: formValues[
          location.pathname.startsWith("/items")
            ? PRODUCT_FIELDTYPE.TITLE
            : ARTICLE_FIELDTYPE.TITLE
        ] as string,
      };

      addComment.mutate({ productData: commentData, file: null });
    }
  };

  useEffect(() => {
    setFormValues(initializeFormValues());
  }, [fields]);

  const formClassName = `${styles.form} ${
    bottomButton ? styles["bottom-button"] : ""
  }`;

  return (
    <form
      method="post"
      className={formClassName}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
    >
      <div className={styles["title-wrapper"]}>
        <h1 className={styles.title}>{titleText}</h1>
        {!bottomButton && (
          <Button href={""} disabled={!isValid}>
            {buttonText}
          </Button>
        )}
      </div>
      {Object.values(fields).map((field) => (
        <div className={styles["input-wrapper"]} key={field.id}>
          <h2 className={styles["input-label"]}>{field.name}</h2>
          <InputField
            field={field}
            value={formValues[field.id]}
            onChange={handleChange}
          />
        </div>
      ))}
      {bottomButton && (
        <div className={styles["bottom-button"]}>
          <Button href="" disabled={!isValid}>
            {buttonText}
          </Button>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
