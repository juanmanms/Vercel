
function SearchBox(props) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Busca una tienda"
        onChange={props.handleInput}
      />
    </div>
  );
}

export default SearchBox;