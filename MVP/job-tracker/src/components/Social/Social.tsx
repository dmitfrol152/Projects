import { Link } from "react-router-dom";
import { SOCIAL } from "@/constants/social";

export function Social() {
  return (
    <ul className="flex items-center gap-3">
      {SOCIAL.map((link, index) => {
        return (
          <li key={index}>
            <Link
              className={link.classLink}
              to={link.to}
              target={link.target}
              rel={link.rel}
            >
              {link.icon}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
