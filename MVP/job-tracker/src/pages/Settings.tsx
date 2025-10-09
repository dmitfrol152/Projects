import { SettingsLayout } from "@/components/SettingsLayout";
import { SettingsParagraph } from "@/components/SettingsLayout/SettingsParagraph";
import { SettingsTitle } from "@/components/SettingsLayout/SettingsTitle";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAuth, useTheme } from "@/hooks/useContext";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/useModalManager/useModal";
import React from "react";
import { getStatusModalSetting } from "@/utils/getStatusModalSetting";
import { useHandleSave } from "@/hooks/useProfileManager/useHandleSave/useHandleSave";
import { useHandleDeleteProfile } from "@/hooks/useProfileManager/useHandleDeleteProfile/useHandleDeleteProfile";
import { SettingInputFullNameInfo } from "@/components/SettingsLayout/SettingInputFullNameInfo";
import { SettingInputAvatarInfo } from "@/components/SettingsLayout/SettingInputAvatarInfo";
import { SettingButtonAvatarDelete } from "@/components/SettingsLayout/SettingButtonAvatarDelete";
import { SettingButtonThemeLight } from "@/components/SettingsLayout/SettingButtonThemeLight";
import { SettingButtonThemeDark } from "@/components/SettingsLayout/SettingButtonThemeDark";
import { SettingButtonSave } from "@/components/SettingsLayout/SettingButtonSave";
import { SettingButtonDeleteProfile } from "@/components/SettingsLayout/SettingButtonDeleteProfile";
import { SettingModal } from "@/components/SettingsLayout/SettingModal";

export default React.memo(function Settings() {
  const { user, profile, refreshProfile, loadingProfile } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { isOpen, modalRef, openModal, closeModal } = useModal();
  const [modalAppeareName, setModalAppeareName] = useState<
    | "errorEdit"
    | "successEdit"
    | "errorDeleteProfile"
    | "successDeleteProfile"
    | "confirmDeleteProfile"
    | null
  >(null);
  const handleSaveWrapper = useHandleSave();
  const handleDeleteProfileWrapper = useHandleDeleteProfile();

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
    return handleDeleteProfileWrapper({
      user,
      setAvatarFile,
      setAvatarUrl,
      refreshProfile,
      openModal,
      closeModal,
      setModalAppeareName,
      setLoadingSave,
    });
  }

  const handleSave = async () => {
    return handleSaveWrapper({
      user,
      avatarFile,
      avatarUrl,
      memoryUrl,
      setMemoryUrl,
      fullName,
      refreshProfile,
      openModal,
      setModalAppeareName,
      setLoadingSave,
    });
  };

  return (
    <SettingsLayout
      loadingSave={loadingSave}
      loadingProfile={loadingProfile}
      theme={theme}
      toggleTheme={setTheme}
      title={<SettingsTitle />}
      paragraph={<SettingsParagraph />}
      fullnameInput={
        <SettingInputFullNameInfo
          fullName={fullName}
          setFullName={setFullName}
        />
      }
      avatarInput={<SettingInputAvatarInfo handleAddAvatar={handleAddAvatar} />}
      avatarDelete={
        <SettingButtonAvatarDelete
          handleDeleteAvatar={handleDeleteAvatar}
          avatarUrl={avatarUrl}
        />
      }
      srcImage={avatarUrl}
      avatarName={avatarFile?.name}
      avatarAddError={errorAddAvatar}
      buttonLight={
        <SettingButtonThemeLight theme={theme} setTheme={setTheme} />
      }
      buttonDark={<SettingButtonThemeDark theme={theme} setTheme={setTheme} />}
      buttonSave={<SettingButtonSave handleSave={handleSave} />}
      buttonDeleteProfile={
        <SettingButtonDeleteProfile
          handleConfirmDeleteProfile={handleConfirmDeleteProfile}
        />
      }
      modal={
        <SettingModal
          isOpen={isOpen}
          modalRef={modalRef}
          getStatusModalSetting={getStatusModalSetting}
          modalAppeareName={modalAppeareName}
          handleDeleteProfile={handleDeleteProfile}
          closeModal={closeModal}
          setModalAppeareName={setModalAppeareName}
        />
      }
    />
  );
});
