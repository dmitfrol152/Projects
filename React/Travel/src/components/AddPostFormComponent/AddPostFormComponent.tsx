import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./AddPostFormComponent.module.scss";
import { FormSchema } from "./types";
import FormField from "../FormField/FormField";
import FormTextarea from "../FormTextarea/FormTextarea";
import { Button } from "../Button";
import IconBack from "../../assets/images/svg/icon-back.svg?react";
import { useMutation } from "@tanstack/react-query";
import { fetchAddPost } from "../../api/Posts/Posts";
import { queryClient } from "../../api/queryClient";
import { useSearchParams } from "react-router";
import FormPhoto from "../FormPhoto/FormPhoto";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const AddPostFormComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: zodResolver(FormSchema) });
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorValue, setErrorValue] = useState(false);

  const addPostSubmit = useMutation({
    mutationFn: fetchAddPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      const params = new URLSearchParams(searchParams);
      params.set("send", "successful");
      setSearchParams(params);
      setErrorValue(false);
    },
    onError: () => {
      setErrorValue(true);
    },
  });

  const titleValue = watch("title");
  const countryValue = watch("country");
  const cityValue = watch("city");
  const descriptionValue = watch("description");
  const photoValue = watch("photo");

  const emptyValue =
    !titleValue ||
    !cityValue ||
    !countryValue ||
    !descriptionValue ||
    !photoValue;

  const handleBack = () => {
    setSearchParams({});
  };

  return (
    <section className={styles.addPost}>
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
              className={styles.addPost__form}
              onSubmit={handleSubmit((data) => {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("country", data.country);
                formData.append("city", data.city);
                formData.append("description", data.description);
                formData.append("photo", data.photo[0]);

                addPostSubmit.mutate(formData);
              })}
            >
              <div className={styles.addPost__formWrapper}>
                <h3 className={styles.addPost__formTitle}>
                  Добавление истории о путешествии
                </h3>
                {errorValue ? (
                  <span className={styles.review__formError}>
                    Произошла ошибка при добавлении поста
                  </span>
                ) : null}
                <div className={styles.addPost__formInner}>
                  <FormPhoto
                    id="photo"
                    type="file"
                    label="Загрузите ваше фото"
                    errors={
                      typeof errors.photo?.message === "string"
                        ? errors.photo.message
                        : undefined
                    }
                    nameFile={
                      photoValue && photoValue.length > 0 && photoValue[0].name
                    }
                    {...register("photo")}
                  />
                  <FormField
                    id="title"
                    label="Заголовок"
                    type="text"
                    placeholder="Заголовок"
                    error={Boolean(errors.title?.message)}
                    errors={errors.title?.message}
                    {...register("title")}
                  />
                  <div className={styles.addPost__formInputs}>
                    <FormField
                      id="country"
                      label="Страна"
                      type="text"
                      placeholder="Страна"
                      error={Boolean(errors.country?.message)}
                      errors={errors.country?.message}
                      {...register("country")}
                    />
                    <FormField
                      id="city"
                      label="Город"
                      type="text"
                      placeholder="Город"
                      error={Boolean(errors.city?.message)}
                      errors={errors.city?.message}
                      {...register("city")}
                    />
                  </div>
                  <FormTextarea
                    id="description"
                    label="Описание"
                    placeholder="Добавьте описание вашей истории"
                    error={Boolean(errors.description?.message)}
                    errors={errors.description?.message}
                    rows={5}
                    {...register("description")}
                  />
                  <div className={styles.addPost__formButtons}>
                    <Button
                      title={
                        <div className={styles.addPost__formButtonsBack}>
                          <IconBack
                            className={styles.addPost__formButtonsSvg}
                          />
                          <span className={styles.addPost__formButtonsText}>
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
                      isLoading={addPostSubmit.isPending}
                    />
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AddPostFormComponent;
