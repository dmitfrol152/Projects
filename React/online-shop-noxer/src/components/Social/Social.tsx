import styles from "./Social.module.scss";
import { SOCIAL_LINKS } from "@/constants/social_links";
import { LinkUi } from "@/ui/LinkUi";

export function Social({ location }: { location: string }) {
  return (
    <ul className={styles.social}>
      {SOCIAL_LINKS.map((link, index) => {
        return (
          <li key={index}>
            <LinkUi variant="social" to={link.to} active={location === link.to}>
              <div className={styles.social__linkIcon}>{link.icon}</div>
            </LinkUi>
          </li>
        );
      })}
    </ul>
  );
}
