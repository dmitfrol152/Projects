import { FC } from "react";
import styles from "./FormPhotoUser.module.scss";
import { FormFieldProps } from "./types";
import IconPhoto from "../../assets/images/svg/icon-photo.svg?react";

export const FormPhotoUser: FC<FormFieldProps> = ({
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
            <IconPhoto className={styles.customFileInput__labelSvg} />
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
          {nameFile ? nameFile : null}
        </span>
      </div>
      {errors && (
        <span className={styles.customFileInput__error}>{errors}</span>
      )}
    </div>
  );
};

export default FormPhotoUser;
