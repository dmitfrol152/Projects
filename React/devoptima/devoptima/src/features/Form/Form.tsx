import { useState, type FormEvent } from "react";
import TextInput from "../../shared/ui/TextInput/TextInput";
import styles from "./Form.module.scss";
import Button from "../../shared/ui/ButtonUi/Button";
import IconLoading from "../../shared/assets/images/svg/icon-loading.svg?react";
import IconSuccess from "../../shared/assets/images/svg/icon-success.svg?react";
import IconError from "../../shared/assets/images/svg/icon-error.svg?react";
import type { Status } from "./types";

export function Form() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setStatus("loading");

    if (!email.trim()) {
      setStatus("required");
      return;
    }

    const isValid = email.includes("@");
    setStatus(isValid ? "success" : "error");
  };
  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit} className={styles.form__wrapper}>
        <TextInput
          type="email"
          placeholder="Your business email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
        />
        <div className={styles.form__button}>
          {(status === "idle" || status === "required") && (
            <Button type="submit" size="big" variant="secondary">
              Free trial
            </Button>
          )}
          {status === "loading" && (
            <IconLoading className={styles.form__loading} />
          )}
          {status === "success" && (
            <IconSuccess className={styles.form__loading} />
          )}
          {status === "error" && <IconError className={styles.form__loading} />}
        </div>
      </form>
      {status === "required" && (
        <div className={styles.form__error}>Email is a required field</div>
      )}
    </div>
  );
}
