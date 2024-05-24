import { Link } from "react-router-dom";
import css from "./BackLink.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export const BackLink = ({ href, children }) => {
  return (
    <Link to={href} className={css.backLink}>
      <FaArrowLeftLong className={css.backLinkIcon} />
      {children}
    </Link>
  );
};
