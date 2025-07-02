import { Button } from "../Button";
import ImageNone from "/src/assets/images/posts/image-none.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormEntryProps, UserFormSchema } from "./types";
import FormField from "../FormField/FormField";
import styles from "./UserFormComponent.module.scss";
import { useDispatch } from "react-redux";
import { setEditFormValue } from "../../store/editFormSlice";
import { useMutation } from "@tanstack/react-query";
import { editPasswordUser, editUser } from "../../api/User/User";
import { FC, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { queryClient } from "../../api/queryClient";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import FormPhotoUser from "../FormPhotoUser/FormPhotoUser";
import FormTextarea from "../FormTextarea/FormTextarea";
import { AnimatePresence, motion } from "motion/react";

export const UserFormComponent: FC<UserFormEntryProps> = ({ data }) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const { getUser } = useUser();
  const dispatch = useDispatch();
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(UserFormSchema),
  });

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      dispatch(setEditFormValue({ editFormValue: false }));
    },
  });

  const editPasswordUserMuatation = useMutation({
    mutationFn: editPasswordUser,
  });

  const handleBack = () => {
    dispatch(setEditFormValue({ editFormValue: false }));
  };

  useEffect(() => {
    if (getUser.data) {
      setValue("fullName", getUser.data?.full_name);
      setValue("city", getUser.data?.city);
      setValue("country", getUser.data?.country);
      setValue("bio", getUser.data?.bio);
    }
  }, [getUser.data, setValue]);

  const photoValue = watch("photo");

  const fullNameValue = watch("fullName");
  const countryValue = watch("country");
  const cityValue = watch("city");

  const emptyValue = !fullNameValue || !countryValue || !cityValue;

  if (data) {
    return (
      <div className={styles.userForm}>
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
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
              }}
            >
              <form
                className={styles.userForm__form}
                onSubmit={handleSubmit((editData) => {
                  const formData = new FormData();
                  formData.append("full_name", editData.fullName);
                  formData.append("city", editData.city);
                  formData.append("country", editData.country);
                  if (editData.bio) {
                    formData.append("bio", editData.bio);
                  }
                  if (editData.photo[0]) {
                    formData.append("photo", editData.photo[0]);
                  }
                  editUserMutation.mutate(formData);

                  if (editData.password || editData.confirmPassword) {
                    editPasswordUserMuatation.mutate({
                      password: editData.password || "",
                    });
                  }
                })}
              >
                <div className={styles.userForm__formImage}>
                  <div className={styles.userForm__formPhoto}>
                    {isImageLoading && (
                      <FadeLoader
                        cssOverride={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(0, 0)",
                        }}
                        color="#ffa902"
                      />
                    )}
                    <img
                      className={styles.userForm__formPhotoImg}
                      src={
                        data?.photo
                          ? `https://travelblog.skillbox.cc${data.photo}`
                          : ImageNone
                      }
                      alt="Изображение поста"
                      onLoad={() => setIsImageLoading(false)}
                      onError={(e) => {
                        e.currentTarget.src = ImageNone;
                        setIsImageLoading(false);
                      }}
                      style={{
                        opacity: isImageLoading ? "0" : "1",
                      }}
                    />
                  </div>
                  <FormPhotoUser
                    id="photo"
                    type="file"
                    label="Изменить фото"
                    require={false}
                    nameFile={
                      photoValue && photoValue.length > 0 && photoValue[0].name
                    }
                    {...register("photo")}
                  />
                </div>
                <div className={styles.userForm__formFields}>
                  <div className={styles.userForm__formFieldsMain}>
                    <FormField
                      id="userFullName"
                      label="ФИО"
                      type="text"
                      placeholder="Иванов Иван Иванович"
                      error={Boolean(errors.fullName?.message)}
                      errors={errors.fullName?.message}
                      {...register("fullName")}
                    />
                    <FormField
                      id="country"
                      label="Страна"
                      type="text"
                      placeholder="Россия"
                      error={Boolean(errors.country?.message)}
                      errors={errors.country?.message}
                      {...register("country")}
                    />
                    <FormField
                      id="city"
                      label="Город"
                      type="text"
                      placeholder="Москва"
                      error={Boolean(errors.city?.message)}
                      errors={errors.city?.message}
                      {...register("city")}
                    />
                    <FormTextarea
                      id="bio"
                      label="О себе"
                      placeholder="Информация о себе..."
                      error={Boolean(errors.bio?.message)}
                      errors={errors.bio?.message}
                      rows={7}
                      {...register("bio")}
                    />
                  </div>
                  <div className={styles.userForm__formFieldsPasswords}>
                    <h3 className={styles.userForm__formFieldsPasswordsTitle}>
                      Смена пароля
                    </h3>
                    <div className={styles.userForm__formFieldsPasswordsBlock}>
                      <FormField
                        id="password"
                        label="Новый пароль"
                        type="password"
                        placeholder="Новый пароль"
                        error={Boolean(errors.password?.message)}
                        errors={errors.password?.message}
                        {...register("password")}
                      />
                      <FormField
                        id="confirmPassword"
                        label="Повторите пароль"
                        type="password"
                        placeholder="Повторите пароль"
                        error={Boolean(errors.confirmPassword?.message)}
                        errors={errors.confirmPassword?.message}
                        {...register("confirmPassword")}
                      />
                    </div>
                  </div>
                  <div className={styles.userForm__formFieldsBtns}>
                    <Button
                      title="Назад"
                      type="button"
                      variant="secondary"
                      size="main"
                      isDisable={false}
                      isLoading={false}
                      onClick={handleBack}
                    />
                    <Button
                      title="Сохранить"
                      type="submit"
                      variant="primary"
                      size="main"
                      isDisable={emptyValue}
                      isLoading={
                        editUserMutation.isPending ||
                        editPasswordUserMuatation.isPending
                      }
                    />
                  </div>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }
};

export default UserFormComponent;
