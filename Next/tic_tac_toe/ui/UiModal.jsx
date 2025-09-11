/**
 *
 * @param {{
 *  width: 'md' | 'full',
 *  className: String,
 *  isOpen: Boolean,
 *  onClose: Function
 * }} props
 *
 */

import clsx from "clsx";
import { CloseLightIcon } from "../app/assets/icons/CloseLightIcon";
import { createPortal } from "react-dom";

export function UiModal({
  width = "md",
  className,
  children,
  isOpen = false,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  const handleCloseModal = (event) => {
    const inModal = event.target.closest("[data-id='modal']");
    if (inModal) {
      return;
    }
    onClose();
  };

  const modal = (
    <div
      onClick={handleCloseModal}
      className={clsx(
        "fixed inset-0 bg-slate-900/60 backdrop-blur pt-10 pb-10 overflow-y-auto",
        className,
      )}
    >
      <div
        data-id="modal"
        className={clsx(
          "bg-white rounded-lg min-h-[320px] mx-auto relative",
          "flex flex-col",
          {
            md: "max-w-[640px] w-full",
            full: "mx-5",
          }[width],
        )}
      >
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-white/10 absolute top-0 -right-12 rounded hover:bg-white/40 transition-colors"
          type="button"
        >
          <CloseLightIcon className="w-4 h-4 text-white" />
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal"));
}

UiModal.Header = function UiModalHeader({ children, className }) {
  return (
    <div className={clsx("px-6 pt-6 pb-4 text-2xl", className)}>{children}</div>
  );
};

UiModal.Body = function UiModalBody({ children, className }) {
  return <div className={clsx("px-6", className)}>{children}</div>;
};

UiModal.Footer = function UiModalFooter({ children, className }) {
  return (
    <div className={clsx("mt-auto p-6 flex gap-4 justify-end", className)}>
      {children}
    </div>
  );
};
