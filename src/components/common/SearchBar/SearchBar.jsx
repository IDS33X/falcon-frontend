import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import { useState } from 'react'

const SearchBarComponent = ({ onSearchClick, search, setSearch, history, testId}) => {
  //const [searchItem, setSearchItem] = useState("");
    const classes = useStyles();
    
    // const handleCancel = () => {
    //   setSearch("");
    //   onSearchClick();
    //   //history.push('/');
    // }

    return (  
          <SearchBar
            testId={testId ?? "searchBar"}
            onRequestSearch={(e) => onSearchClick(e)}
            value={search}
            onChange={value => { setSearch(value); }}
            onCancelSearch={(e) => { setSearch(""); onSearchClick(e);}}
            placeholder	= "Buscar..."
            className={classes.searchBar}/>  
    );
}

export default SearchBarComponent;