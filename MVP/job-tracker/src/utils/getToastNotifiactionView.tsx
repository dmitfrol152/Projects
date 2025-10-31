import { toast } from "react-toastify";
import IconSuccess from "@assets/svg/icon-success.svg?react";
import IconAttention from "@assets/svg/icon-attention.svg?react";
import IconError from "@assets/svg/icon-error.svg?react";

export const toastNotifiactionView = {
  success: (msg: string) =>
    toast.success(
      <div className="flex items-center gap-3">
        {<IconSuccess className="w-10 h-10" />}
        <div>
          <p>Notification!</p>
          <span>{msg}</span>
        </div>
      </div>,
      {
        autoClose: 1000 * 5,
        className: "bg-[var(--color-primary)]",
      }
    ),

  info: (msg: string) =>
    toast.info(
      <div className="flex items-center gap-3">
        {<IconAttention className="w-10 h-10" />}
        <div>
          <p>Notification!</p>
          <span>{msg}</span>
        </div>
      </div>,
      {
        autoClose: 1000 * 60 * 1,
        className: "bg-[var(--color-primary)]",
      }
    ),

  error: (msg: string) =>
    toast.error(
      <div className="flex items-center gap-3">
        {<IconError className="w-10 h-10" />}
        <div>
          <p>Notification!</p>
          <span>{msg}</span>
        </div>
      </div>,
      {
        autoClose: 1000 * 5,
        className: "bg-[var(--color-primary)]",
      }
    ),
};
