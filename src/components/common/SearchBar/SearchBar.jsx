import useStyles from './styles';
import SearchBar from "material-ui-search-bar";
import {useState} from 'react'

<<<<<<< HEAD
const SearchBarComponent = ({onSearchClick, search, setSearch, history}) => {
  //const [searchItem, setSearchItem] = useState("");
    const classes = useStyles();
    
    function handle (e){
      onSearchClick();
      console.log(e);
=======
const SearchBarComponent = ({onSearch, onCancel}) => {
  const [searchItem, setSearchItem] = useState("");
  const classes = useStyles();

  
    const handleCancel = () => {
      setSearchItem("");
      onCancel();   
>>>>>>> affe6a74e8ff785d4e460cc7638a62d23863967d
    }


    return (  
          <SearchBar
<<<<<<< HEAD
            onRequestSearch={(e) => onSearchClick()}
            value={search}
            onChange={value => { setSearch(value); }}
            onCancelSearch={() => { setSearch(""); history.push('/'); }}
=======
            onRequestSearch={(e) => onSearch(e)}
            value={searchItem}
            onChange={value => { setSearchItem(value); }}
            onCancelSearch={handleCancel}
>>>>>>> affe6a74e8ff785d4e460cc7638a62d23863967d
            placeholder	= "Buscar..."
            className={classes.searchBar}/>  
    );
}
 
export default SearchBarComponent;