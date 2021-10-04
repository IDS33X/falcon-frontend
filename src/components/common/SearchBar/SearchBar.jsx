import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import { useState } from 'react'

const SearchBarComponent = ({ onSearchClick, search, setSearch, history }) => {
  //const [searchItem, setSearchItem] = useState("");
  const classes = useStyles();


  return (
    <SearchBar
      onRequestSearch={(e) => onSearchClick(e)}
      value={search}
      onChange={value => { setSearch(value); }}
      onCancelSearch={(e) => { setSearch(""); onSearchClick(e); }} //history.push('/');
      placeholder="Buscar..."
      className={classes.searchBar} />
  );
}

export default SearchBarComponent;