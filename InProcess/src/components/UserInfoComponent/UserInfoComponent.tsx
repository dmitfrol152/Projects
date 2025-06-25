// import { Button } from "../Button";
// import IconPhoto from "../../assets/images/svg/icon-photo.svg?react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import FormField from "../FormField/FormField";
import { FC } from "react";
import styles from "./UserInfoComponent.module.scss";
import { UserInfoProps } from "./types";
import { Button } from "../Button";
import IconEdit from "../../assets/images/svg/icon-edit.svg?react";
import { useDispatch } from "react-redux";
import { setEditFormValue } from "../../store/editFormSlice";
// import { setEditFormValue } from "../../store/editFormSlice";
// import { useMutation } from "@tanstack/react-query";
// import { editUser } from "../../api/User/User";

export const UserInfoComponent: FC<UserInfoProps> = ({ data, loading }) => {
  const dispatch = useDispatch();
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm({
  //   resolver: zodResolver(UserFormSchema),
  // });

  if (!data && loading) {
    return 123;
  }

  // const editUserMutation = useMutation({
  //   mutationFn: editUser,
  //   onSuccess: () => {
  //     dispatch(setEditFormValue({ editFormValue: false }));
  //   },
  // });

  const handleEditUser = () => {
    dispatch(setEditFormValue({ editFormValue: true }));
  };

  return (
    <div className={styles.userInfo}>
      <div className="container">
        <div className={styles.userInfo__wrapper}>
          <div className={styles.userInfo__image}>
            <img
              className={styles.userInfo__imageSrc}
              src=""
              alt="Фотография пользователя"
            />
            {/* <input type="file" accept="image/*" {...register("photo")}></input> */}
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
          <div className={styles.userInfo__Inner}>
            <div className={styles.userInfo__title}>
              <h3 className={styles.userInfo__titleText}>{data?.full_name}</h3>
              <Button
                title={<IconEdit className={styles.userInfo__svg} />}
                type="button"
                variant="svg"
                size="none"
                isDisable={loading}
                isLoading={loading}
                onClick={handleEditUser}
              />
            </div>
            <div className={styles.userInfo__country}>
              <span className={styles.userInfo__countryTitle}>Страна:</span>
              <span className={styles.userInfo__countryText}>
                {data?.country}
              </span>
            </div>
            <div className={styles.userInfo__city}>
              <span className={styles.userInfo__cityTitle}>Город:</span>
              <span className={styles.userInfo__cityText}>{data?.city}</span>
            </div>
            <div className={styles.userInfo__bio}>
              <span className={styles.userInfo__bioTitle}>О себе:</span>
              <span className={styles.userInfo__bioText}>{data?.bio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoComponent;
