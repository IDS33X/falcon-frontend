/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import useStyles from './styles';
export const itemsPerPage = 8;
const Paginate = ({ page, stateSource, onDispatch, mainRouteName, areaId, divisionId, departmentId }) => {
  
  const { amountOfPages } = stateSource;
  //const { amountOfPages } = useSelector((state) => state.areas);
  //console.log(amountOfPages);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      onDispatch();
      console.log(amountOfPages);
      console.log(mainRouteName);
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={amountOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => ( //Configuring the item buttons, here item refers to each button.
            mainRouteName === 'areas' ? <PaginationItem {...item} component={Link} to={`/${mainRouteName}?page=${item.page}`} /> 
            : (mainRouteName === 'divisions') ? <PaginationItem {...item} component={Link} to={`/${mainRouteName}?areaId=${areaId}&page=${item.page}`} />
            : (mainRouteName === 'departments') ? <PaginationItem {...item} component={Link} to={`/${mainRouteName}?divisionId=${divisionId}&page=${item.page}`} />
            : (mainRouteName === 'riskcategories') ? <PaginationItem {...item} component={Link} to={`/${mainRouteName}?departmentId=${departmentId}&page=${item.page}`} />
            : null
            // Crear paginacion para divisionsSearch y areasSearch.
      )}
    />
  );
};

export default Paginate;