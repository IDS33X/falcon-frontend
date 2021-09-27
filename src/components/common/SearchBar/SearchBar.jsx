import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import {useState} from 'react'

const SearchBarComponent = ({onSearch, onCancel}) => {
  const [searchItem, setSearchItem] = useState("");
  const classes = useStyles();

  
    const handleCancel = () => {
      setSearchItem("");
      onCancel();   
    }


    return (  
          <SearchBar
            onRequestSearch={(e) => onSearch(e)}
            value={searchItem}
            onChange={value => { setSearchItem(value); }}
            onCancelSearch={handleCancel}
            placeholder	= "Buscar..."
            className={classes.searchBar} />  
    );
}
 
export default SearchBarComponent;