import { FC } from "react";
import { FormFieldProps } from "./types";
import styles from "./FormField.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const FormField: FC<FormFieldProps> = ({
  label,
  type,
  name,
  onChange,
  value,
  placeholder,
  icon,
  error,
  ...props
}) => {
  return (
    <>
      <div
        className={
          !error ? `${styles.formField}` : `${styles.formField} ${styles.error}`
        }
      >
        <input
          aria-label={label}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={styles.formField__input}
          {...props}
        />
        <span className={styles.formField__icon}>{icon}</span>
      </div>
      {error && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <span className={styles.formField__error}>{error}</span>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
