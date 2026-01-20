import { SettingsLayout } from "@pages/settings/ui";
import { SettingsParagraph } from "@features/setting/ui/SettingsParagraph";
import { SettingsTitle } from "@features/setting/ui/SettingsTitle";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAuth, useTheme } from "@shared/lib/context/contexts";
import { useNavigate } from "react-router-dom";
import { useModal } from "@shared/lib/hooks/useModal";
import React from "react";
import { getStatusModalSetting } from "@shared/ui/ModalStatus/getStatusModalSetting";
import { useHandleSave } from "@features/profile/model/hooks/useHandleSave/useHandleSave";
import { useHandleDeleteProfile } from "@features/profile/model/hooks/useHandleDeleteProfile/useHandleDeleteProfile";
import { SettingInputFullNameInfo } from "@features/setting/ui/SettingInputFullNameInfo";
import { SettingInputAvatarInfo } from "@features/setting/ui/SettingInputAvatarInfo";
import { SettingButtonAvatarDelete } from "@features/setting/ui/SettingButtonAvatarDelete";
import { SettingButtonThemeLight } from "@features/setting/ui/SettingButtonThemeLight";
import { SettingButtonThemeDark } from "@features/setting/ui/SettingButtonThemeDark";
import { SettingButtonSave } from "@features/setting/ui/SettingButtonSave";
import { SettingButtonDeleteProfile } from "@features/setting/ui/SettingButtonDeleteProfile";
import { SettingModal } from "@features/setting/ui/SettingModal";
import { SettingButtonPaginationScroll } from "@features/setting/ui/SettingButtonPaginationScroll";
import { usePaginationSetting } from "@features/profile/model/hooks/usePaginationSetting";
import { SettingButtonPaginationButtons } from "@features/setting/ui/SettingButtonPaginationButtons";
import { useLanguageSetting } from "@/features/profile/model/hooks/useLanguageSetting";
import { SettingButtonLanguageRu } from "@/features/setting/ui/SettingButtonLanguageRu";
import { SettingButtonLanguageEn } from "@/features/setting/ui/SettingButtonLanguageEn";

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
  const { paginationModel, togglePaginationModel } = usePaginationSetting();
  const { currentLanguage, toggleLanguage } = useLanguageSetting();
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
  }, [
    profile?.id,
    profile?.avatar_url,
    profile?.full_name,
    user?.id,
    navigate,
  ]);

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
      pagination={paginationModel}
      togglePagination={togglePaginationModel}
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
      buttonPaginationScroll={
        <SettingButtonPaginationScroll
          pagination={paginationModel}
          setPagination={togglePaginationModel}
        />
      }
      buttonPaginationButtons={
        <SettingButtonPaginationButtons
          pagination={paginationModel}
          setPagination={togglePaginationModel}
        />
      }
      buttonLanguageEn={
        <SettingButtonLanguageEn
          currentLanguage={currentLanguage}
          toggleLanguage={toggleLanguage}
        />
      }
      buttonLanguageRu={
        <SettingButtonLanguageRu
          currentLanguage={currentLanguage}
          toggleLanguage={toggleLanguage}
        />
      }
      currentLanguage={currentLanguage}
      toggleLanguage={toggleLanguage}
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
