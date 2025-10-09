import type { Dispatch, ReactNode, Ref } from "react";
import z from "zod";

export const SettingModalSchema = z.object({
  isOpen: z.boolean(),
  modalRef: z.custom<Ref<HTMLDivElement>>(),
  getStatusModalSetting: z.function({
    input: [z.string().nullable()],
    output: z.custom<ReactNode | null>(),
  }),
  modalAppeareName: z
    .enum([
      "errorEdit",
      "successEdit",
      "errorDeleteProfile",
      "successDeleteProfile",
      "confirmDeleteProfile",
    ])
    .nullable(),
  handleDeleteProfile: z.function({
    input: [],
    output: z.void(),
  }),
  closeModal: z.function({
    input: [],
    output: z.void(),
  }),
  setModalAppeareName:
    z.custom<
      Dispatch<
        React.SetStateAction<
          | "errorEdit"
          | "successEdit"
          | "errorDeleteProfile"
          | "successDeleteProfile"
          | "confirmDeleteProfile"
          | null
        >
      >
    >(),
});

export type SettingModalProps = z.infer<typeof SettingModalSchema>;
