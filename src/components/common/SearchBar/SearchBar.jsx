import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import {useState} from 'react'

const SearchBarComponent = ({onSearchClick, search, setSearch, history}) => {
  //const [searchItem, setSearchItem] = useState("");
    const classes = useStyles();
    
    function handle (e){
      onSearchClick();
      console.log(e);
    }

    return (  
          <SearchBar
            onRequestSearch={(e) => onSearchClick()}
            value={search}
            onChange={value => { setSearch(value); }}
            onCancelSearch={() => { setSearch(""); history.push('/'); }}
            placeholder	= "Buscar..."
            className={classes.searchBar}/>  
    );
}
 
export default SearchBarComponent;