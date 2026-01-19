export function getStatusModalSetting(modalAppeareName: string | null) {
  switch (modalAppeareName) {
    case "errorEdit":
      return "settingsModalErrorSave";
    case "successEdit":
      return "settingsModalSuccessSave";
    case "errorDeleteProfile":
      return "settingsModalErrorDelete";
    case "successDeleteProfile":
      return "settingsModalSuccessDelete";
    case "confirmDeleteProfile":
      return "settingsModalConfirmDelete";
    default:
      return null;
  }
}
