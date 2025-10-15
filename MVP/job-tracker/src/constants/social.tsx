import IconGitHub from "@assets/svg/icon-github.svg?react";
import IconTg from "@assets/svg/icon-tg.svg?react";
import IconWhatsApp from "@assets/svg/icon-whatsapp.svg?react";
import IconMail from "@assets/svg/icon-google-mail.svg?react";
import type { SocialProps } from "./types";

const classNameIcon = "w-7 h-7";
const classNameLink =
  "transition-colors text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]";

export const SOCIAL: SocialProps[] = [
  {
    to: "https://github.com/dmitfrol152",
    icon: <IconGitHub className={classNameIcon} />,
    classLink: classNameLink,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    to: "https://t.me/dimon_frolkov",
    icon: <IconTg className={classNameIcon} />,
    classLink: classNameLink,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    to: "https://wa.me/79687671773",
    icon: <IconWhatsApp className={classNameIcon} />,
    classLink: classNameLink,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    to: "mailto:dmitfrol152@mail.ru?subject=Вопрос%20по%20работе%20(предложение)&body=Здравствуйте,%20Дмитрий!%0A%0AУ%20меня%20есть%20вопрос%20(предложение).",
    icon: <IconMail className={classNameIcon} />,
    classLink: classNameLink,
    target: "_blank",
    rel: "noopener noreferrer",
  },
];
