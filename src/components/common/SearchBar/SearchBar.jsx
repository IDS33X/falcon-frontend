import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import {useState} from 'react'

const SearchBarComponent = ({onSearchClick}) => {
  const [searchItem, setSearchItem] = useState("");
    const classes = useStyles();
    
    function handle (e){
      onSearchClick();
      console.log(e);
    }

    return (  
          <SearchBar
            onRequestSearch={(e) => handle(e)}
            value={searchItem}
            onChange={value => { setSearchItem(value); }}
            onCancelSearch={() => { setSearchItem(""); }}
            placeholder	= "Buscar..."
            className={classes.searchBar} />  
    );
}
 
export default SearchBarComponent;