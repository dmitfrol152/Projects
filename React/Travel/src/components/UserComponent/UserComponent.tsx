import { FC } from "react";
import { UserProps } from "./types";
import IconEdit from "../../assets/images/svg/icon-edit.svg?react";
import { Button } from "../Button";
import styles from "./UserComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { EditFormObjectProps } from "../../store/types";
import { setEditFormValue } from "../../store/editFormSlice";
import { UserInfoComponent } from "../UserInfoComponent";
import { UserFormComponent } from "../UserFormComponent";

export const UserComponent: FC<UserProps> = ({ data, loading }) => {
  const editFromStatus = useSelector(
    (state: EditFormObjectProps) => state.editFormStatus.editFormValue
  );
  const dispatch = useDispatch();

  const handleEditUser = () => {
    dispatch(setEditFormValue({ editFormValue: true }));
  };

  if (
    (!data?.city || !data?.country || !data?.full_name) &&
    editFromStatus === false
  ) {
    return (
      <div className={styles.userComponent}>
        <div className="container">
          <div className={styles.userComponent__wrapper}>
            <span className={styles.userComponent__text}>
              Добавьте информацию о себе
            </span>
            <Button
              title={<IconEdit className={styles.userComponent__svg} />}
              type="button"
              variant="svg"
              size="none"
              isDisable={loading}
              isLoading={loading}
              onClick={handleEditUser}
            />
          </div>
        </div>
      </div>
    );
  }

  if (editFromStatus === true) {
    return <UserFormComponent data={data} />;
  }

  return <UserInfoComponent data={data} loading={loading} />;
};

export default UserComponent;
