export function getStatusModalSetting(modalAppeareName: string | null) {
  switch (modalAppeareName) {
    case "errorEdit":
      return <span>Error save profile</span>;
    case "successEdit":
      return <span>Save profile is success!</span>;
    case "errorDeleteProfile":
      return <span>Error delete profile</span>;
    case "successDeleteProfile":
      return <span>Delete profile is success!</span>;
    case "confirmDeleteProfile":
      return <span>Are your sure confirm delete profile?</span>;
    default:
      return null;
  }
}
