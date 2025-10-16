export function getStatusModalSetting(modalAppeareName: string | null) {
  switch (modalAppeareName) {
    case "errorEdit":
      return (
        <span className="text-[var(--color-danger)]">Error save profile</span>
      );
    case "successEdit":
      return (
        <span className="text-[var(--color-success)]">
          Save profile is success!
        </span>
      );
    case "errorDeleteProfile":
      return (
        <span className="text-[var(--color-danger)]">Error delete profile</span>
      );
    case "successDeleteProfile":
      return (
        <span className="text-[var(--color-success)]">
          Delete profile is success!
        </span>
      );
    case "confirmDeleteProfile":
      return <span>Are your sure confirm delete profile?</span>;
    default:
      return null;
  }
}
