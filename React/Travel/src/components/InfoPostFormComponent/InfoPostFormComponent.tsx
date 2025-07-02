import { useForm } from "react-hook-form";
import { Button } from "../Button";
import FormField from "../FormField/FormField";
import FormTextarea from "../FormTextarea/FormTextarea";
import styles from "./InfoPostFormComponent.module.scss";
import { FormPropsProps, FormSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { fetchAddReview } from "../../api/Posts/Posts";
import { FC, useState } from "react";
import { queryClient } from "../../api/queryClient";
import { useSearchParams } from "react-router";
import IconBack from "../../assets/images/svg/icon-back.svg?react";
import { AnimatePresence, motion } from "motion/react";

export const InfoPostFormComponent: FC<FormPropsProps> = ({ postId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [errorValue, setErrorValue] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const addReviewSubmit = useMutation({
    mutationFn: async (data: {
      postId: string;
      comment: string;
      full_name: string;
    }) => {
      return fetchAddReview(
        { postId: data.postId },
        { comment: data.comment, full_name: data.full_name }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      setErrorValue(false);
      const params = new URLSearchParams(searchParams);
      params.set("send", "successful");
      setSearchParams(params);
    },
    onError: () => {
      setErrorValue(true);
    },
  });

  const nameValue = watch("name");
  const reviewValue = watch("review");

  const emptyValue = !nameValue || !reviewValue;

  const handleBack = () => {
    setSearchParams({});
  };

  return (
    <section className={styles.review}>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}
          >
            <form
              className={styles.review__form}
              onSubmit={handleSubmit((data) => {
                addReviewSubmit.mutate({
                  postId: postId ?? "",
                  comment: data.review,
                  full_name: data.name,
                });
              })}
            >
              <div className={styles.review__formWrapper}>
                <h3 className={styles.review__formTitle}>Добавление отзыва</h3>
                {errorValue ? (
                  <span className={styles.review__formError}>
                    Произошла ошибка при отправке отзыва
                  </span>
                ) : null}
                <div className={styles.review__formInputs}>
                  <FormField
                    id="nameLabel"
                    label="Ваше имя"
                    type="text"
                    placeholder="Ваше имя"
                    error={Boolean(errors.name?.message)}
                    errors={errors.name?.message}
                    {...register("name")}
                  />
                  <FormTextarea
                    id="reviewLabel"
                    label="Отзыв"
                    placeholder="Добавьте текст отзыва"
                    error={Boolean(errors.review?.message)}
                    errors={errors.review?.message}
                    rows={5}
                    {...register("review")}
                  />
                </div>
                <div className={styles.review__formButtons}>
                  <Button
                    title={
                      <div className={styles.review__formButtonsBack}>
                        <IconBack className={styles.review__formButtonsSvg} />
                        <span className={styles.review__formButtonsText}>
                          Назад
                        </span>
                      </div>
                    }
                    variant="secondary"
                    type="button"
                    size="svg"
                    onClick={handleBack}
                    isDisable={false}
                    isLoading={false}
                  />
                  <Button
                    title="Сохранить"
                    variant="primary"
                    type="submit"
                    size="svg"
                    isDisable={emptyValue ? true : false}
                    isLoading={addReviewSubmit.isPending}
                  />
                </div>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InfoPostFormComponent;
