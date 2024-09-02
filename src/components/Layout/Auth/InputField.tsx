import React, { useState } from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import styles from "./Auth.module.scss";
import { FieldInfo } from "@/types/AuthTypes";
import TogglePassword from "./TogglePassword";
import { FIELDTYPE } from "./AuthConfig";

interface InputFieldProps {
  field: FieldInfo;
  control: Control<FieldValues>;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  field: {
    type,
    id,
    label,
    name,
    required,
    emptyErrorMessage,
    placeholder,
    autoComplete,
    invalidErrorMessage,
    validationFunction,
  },
  control,
  error,
}) => {
  const [inputType, setInputType] = useState(type);

  const handlePasswordVisible = (updatedVisible: boolean) => {
    if (id === "password" || id === FIELDTYPE.PASSWORDCONFIRMATION) {
      setInputType(updatedVisible ? "text" : "password");
    }
  };

  return (
    <div className={styles["input-area"]} key={id}>
      <label htmlFor={id}>{label}</label>
      <div
        className={
          styles[
            name === FIELDTYPE.PASSWORD ||
            name === FIELDTYPE.PASSWORDCONFIRMATION
              ? "password-input"
              : ""
          ]
        }
      >
        <Controller
          name={id}
          control={control}
          defaultValue=""
          rules={{
            required: required ? emptyErrorMessage : false,
            validate: validationFunction
              ? (value) => validationFunction(value) || invalidErrorMessage
              : undefined,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              id={id}
              name={name}
              type={inputType}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required={required}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              className={error ? styles["error-border"] : ""}
            />
          )}
        />
        {(name === FIELDTYPE.PASSWORD ||
          name === FIELDTYPE.PASSWORDCONFIRMATION) && (
          <TogglePassword onPasswordVisible={handlePasswordVisible} />
        )}
      </div>
      {error && (
        <h3 className={styles["error-message"]}>
          {error || "에러가 발생했습니다."}
        </h3>
      )}
    </div>
  );
};

export default InputField;
