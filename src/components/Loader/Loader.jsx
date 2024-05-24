import RingLoader from "react-spinners/RingLoader";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.backdrop}>
      <RingLoader color="#388041" size={200} />
    </div>
  );
};
