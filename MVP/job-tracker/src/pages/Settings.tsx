import { SettingsLayout } from "@/components/SettingsLayout";
import { SettingsParagraph } from "@/components/SettingsLayout/SettingsParagraph";
import { SettingsTitle } from "@/components/SettingsLayout/SettingsTitle";
import { InputUi } from "@/ui/InputUi";
import { useEffect, useState, type ChangeEvent } from "react";
import AvatarEmpty from "@assets/png/avatar-empty.png";
import { useAuth, useTheme } from "@/hooks/useContext";
import { useNavigate } from "react-router-dom";
import { useProfileManager } from "@/hooks/useProfileManager/useProfileManager";
import { useModal } from "@/hooks/useModalManager/useModal";
import clsx from "clsx";
import { ButtonUi } from "@/ui/ButtonUi";
import IconLight from "@assets/svg/icon-light.svg?react";
import IconDark from "@assets/svg/icon-dark.svg?react";
import IconClose from "@assets/svg/icon-close.svg?react";
import IconDelete from "@assets/svg/icon-delete.svg?react";
import { Modal } from "@/components/Modal";
import React from "react";
import { getStatusModalSetting } from "@/utils/getStatusModalSetting";

export default React.memo(function Settings() {
  const { user, profile, refreshProfile, loadingProfile } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { uploadAvatar, editProfile, deleteAvatar, deleteProfile } =
    useProfileManager();
  const { isOpen, modalRef, openModal, closeModal } = useModal();
  const [modalAppeareName, setModalAppeareName] = useState<
    | "errorEdit"
    | "successEdit"
    | "errorDeleteProfile"
    | "successDeleteProfile"
    | "confirmDeleteProfile"
    | null
  >(null);

  const [fullName, setFullName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [memoryUrl, setMemoryUrl] = useState<string | null>(null);
  const [errorAddAvatar, setErrorAddAvatar] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    const init = async () => {
      setFullName(profile?.full_name ?? "");
      setAvatarUrl(profile?.avatar_url || null);
    };

    init();
  }, [profile?.id, profile?.avatar_url, profile?.full_name, user?.id, navigate]);

  function handleAddAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorAddAvatar(true);
      return;
    }

    setErrorAddAvatar(false);
    setAvatarFile(file);
    setAvatarUrl(URL.createObjectURL(file));

    event.target.value = "";
  }

  async function handleDeleteAvatar() {
    setMemoryUrl(avatarUrl);
    setAvatarUrl(null);
    setAvatarFile(null);
  }

  function handleConfirmDeleteProfile() {
    openModal();
    setModalAppeareName("confirmDeleteProfile");
  }

  async function handleDeleteProfile() {
    if (!user?.id) return;

    setLoadingSave(true);
    setModalAppeareName(null);
    closeModal();
    try {
      const { error } = await deleteProfile(user.id);

      if (error) {
        throw new Error("Error delete profile");
      }

      setModalAppeareName("successDeleteProfile");
      openModal();
      setLoadingSave(false);
      setAvatarFile(null);
      setAvatarUrl(null);
      refreshProfile();
    } catch (error) {
      setModalAppeareName("errorDeleteProfile");
      openModal();
      setLoadingSave(false);
      console.error(error);
    }
  }

  const handleSave = async () => {
    if (!user) return;

    try {
      let loadedAvatarDB = null;
      setLoadingSave(true);

      if (avatarFile) {
        loadedAvatarDB = await uploadAvatar(user.id, avatarFile);

        if (!loadedAvatarDB) {
          setModalAppeareName("errorEdit");
          setLoadingSave(false);
          openModal();
          return;
        }
      }

      if (!avatarFile && !avatarUrl && memoryUrl) {
        await deleteAvatar(memoryUrl);
        setMemoryUrl(null);
      }

      const { error } = await editProfile({
        id: user.id,
        full_name: fullName,
        avatar_url: loadedAvatarDB || avatarUrl || "",
      });

      if (error) {
        setModalAppeareName("errorEdit");
        openModal();
        throw new Error("Error edit profile");
      }
      setModalAppeareName("successEdit");
      setLoadingSave(false);
      openModal();
      refreshProfile();
    } catch (error) {
      console.error(error);
      setModalAppeareName("errorEdit");
      setLoadingSave(false);
      openModal();
    }
  };

  const classNameLabel =
    "px-4 py-2 border rounded transition-colors border-[var(--color-black)] text-[var(--color-black)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)] focus:tetx-[var(--color-primary)] hover:text-[var(--color-primary)] focus:outline-none cursor-pointer";

  return (
    <SettingsLayout
      loadingSave={loadingSave}
      loadingProfile={loadingProfile}
      theme={theme}
      toggleTheme={setTheme}
      title={<SettingsTitle />}
      paragraph={<SettingsParagraph />}
      fullnameInput={
        <InputUi
          label="Your full name is:"
          placeholder={fullName ? fullName : "Type your fullname"}
          type="text"
          value={fullName}
          setValue={setFullName}
        />
      }
      avatarInput={
        <InputUi
          classNameLabel={classNameLabel}
          className="hidden"
          label="Выбрать файл"
          type="file"
          accept="image/*"
          onChange={handleAddAvatar}
        />
      }
      avatarDelete={
        <ButtonUi
          type="button"
          size="md"
          variant="exit"
          handleClickButton={handleDeleteAvatar}
          disabled={avatarUrl === AvatarEmpty || !avatarUrl}
        >
          <IconDelete className="w-5 h-5" />
        </ButtonUi>
      }
      srcImage={avatarUrl ? avatarUrl : AvatarEmpty}
      avatarName={avatarFile ? avatarFile.name : "Файл не выбран"}
      avatarAddError={clsx(
        "text-sm",
        `${errorAddAvatar ? "text-red-500" : "text-gray-500"}`
      )}
      buttonLight={
        <ButtonUi
          className={clsx(
            "rounded",
            theme === "light"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-400/20 text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-white"
          )}
          type="button"
          size="icon"
          variant="icon"
          handleClickButton={setTheme}
        >
          <IconLight className="w-7 h-7" />
        </ButtonUi>
      }
      buttonDark={
        <ButtonUi
          className={clsx(
            "rounded",
            theme === "dark"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-400/20 text-(var(--color-primary)) hover:bg-[var(--color-primary-hover)] hover:text-white"
          )}
          type="button"
          size="icon"
          variant="icon"
          handleClickButton={setTheme}
        >
          <IconDark className="w-7 h-7" />
        </ButtonUi>
      }
      buttonSave={
        <ButtonUi
          size="md"
          variant="primary"
          type="button"
          handleClickButton={handleSave}
        >
          Save
        </ButtonUi>
      }
      buttonDeleteProfile={
        <ButtonUi
          type="button"
          size="md"
          variant="exit"
          handleClickButton={handleConfirmDeleteProfile}
        >
          Delete profile
        </ButtonUi>
      }
      modal={
        <Modal isOpen={isOpen} modalRef={modalRef}>
          <div className="flex flex-col gap-3">
            {getStatusModalSetting(modalAppeareName)}
            {modalAppeareName === "confirmDeleteProfile" && (
              <ButtonUi
                type="button"
                size="md"
                variant="exit"
                handleClickButton={handleDeleteProfile}
              >
                Delete profile
              </ButtonUi>
            )}
          </div>
          <ButtonUi
            size="icon"
            variant="icon"
            type="button"
            className="absolute top-1 right-1 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            handleClickButton={() => {
              closeModal();
              setModalAppeareName(null);
            }}
          >
            <IconClose className="w-5 h-5" />
          </ButtonUi>
        </Modal>
      }
    />
  );
});
