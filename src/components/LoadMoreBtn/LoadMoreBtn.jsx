import css from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ children, onClick }) => {
  return (
    <button className={css.loadMoreBtn} onClick={onClick}>
      {children}
    </button>
  );
};
