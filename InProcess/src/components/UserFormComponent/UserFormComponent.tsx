import { Button } from "../Button";
// import IconPhoto from "../../assets/images/svg/icon-photo.svg?react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from "./types";
import FormField from "../FormField/FormField";
import styles from "./UserFormComponent.module.scss";
import { useDispatch } from "react-redux";
import { setEditFormValue } from "../../store/editFormSlice";
import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../api/User/User";
// import { useUser } from "../../hooks/useUser";
// import { queryClient } from "../../api/queryClient";
// import { useEffect } from "react";

export const UserFormComponent = () => {
  // const { getUser } = useUser();
  const dispatch = useDispatch();
  const {
    // setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(UserFormSchema),
  });

  const editUserMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      dispatch(setEditFormValue({ editFormValue: false }));
    },
  });

  const handleBack = () => {
    dispatch(setEditFormValue({ editFormValue: false }));
  };

  // useEffect(() => {
  //   if (getUser.data) {
  //     setValue("fullName", getUser.data?.full_name);
  //     setValue("city", getUser.data?.city);
  //     setValue("country", getUser.data?.country);
  //     setValue("aboutSelf", getUser.data?.bio);
  //   }
  // }, [getUser.data, setValue]);

  return (
    <div className={styles.userForm}>
      <div className="container">
        <form
          className={styles.userForm__form}
          onSubmit={handleSubmit((editData) => {
            console.log(editData);
            editUserMutation.mutate({
              full_name: editData.fullName,
              city: editData.city,
              country: editData.country,
              bio: editData.aboutSelf,
              photo: editData.photo,
            });
          })}
        >
          <div className={styles.userForm__formImage}>
            <img
              className={styles.userForm__formImageSrc}
              src="#"
              alt="Фотография пользователя"
            />
            <input type="file" accept="image/*" {...register("photo")}></input>
            {/* <Button
              title={
                <span className={styles.userForm__formImageBlock}>
                  <IconPhoto className={styles.userForm__formImageSvg} />
                  <span className={styles.userForm__formImageText}>
                    Изменить фото
                  </span>
                </span>
              }
              type="button"
              variant="link"
              size="none"
              isDisable={false}
              isLoading={false}
            /> */}
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
              <FormField
                id="aboutSelf"
                label="О себе"
                type="text"
                placeholder="Информация о себе..."
                error={Boolean(errors.aboutSelf?.message)}
                require={false}
                errors={errors.aboutSelf?.message}
                {...register("aboutSelf")}
              />
            </div>
            <div className={styles.userForm__formFieldsPasswords}>
              <h3 className={styles.userForm__formFieldsPasswordsTitle}>
                Смена пароля
              </h3>
              <div className={styles.userForm__formFieldsPasswordsBlock}>
                {/* <FormField
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
                /> */}
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
                isDisable={false}
                isLoading={false}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormComponent;
