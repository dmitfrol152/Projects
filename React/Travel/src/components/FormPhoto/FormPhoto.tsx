import { FC } from "react";
import styles from "./FormPhoto.module.scss";
import { FormFieldProps } from "./types";
import IconDownload from "../../assets/images/svg/icon-download.svg?react";

export const FormPhoto: FC<FormFieldProps> = ({
  id,
  label,
  type,
  errors,
  require = true,
  nameFile,
  ...props
}) => {
  return (
    <div className={styles.customFileInput}>
      <div className={styles.customFileInput__name}>
        <label className={styles.customFileInput__label} htmlFor={id}>
          <span className={styles.customFileInput__labelInner}>
            <IconDownload className={styles.customFileInput__labelSvg} />
            <span className={styles.customFileInput__labelText}>{label}</span>
          </span>
          <input
            className={styles.customFileInput__field}
            type={type}
            id={id}
            required={require}
            accept="image/*"
            {...props}
          />
        </label>
        <span className={styles.customFileInput__text}>
          {nameFile ? nameFile : "Файл не выбран"}
        </span>
      </div>
      {errors && (
        <span className={styles.customFileInput__error}>{errors}</span>
      )}
    </div>
  );
};

export default FormPhoto;
