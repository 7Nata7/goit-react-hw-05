import css from "./SearchMovie.module.css";

export const SearchMovie = ({ value, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim().toLowerCase();

    onSubmit(value);
    e.target.reset();
  };

  return (
    <div className={css.search}>
      <form value={value} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
