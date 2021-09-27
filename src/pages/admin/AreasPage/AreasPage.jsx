import React, { useState, useEffect } from 'react';
import { Grow, Grid, Paper } from '@material-ui/core';
import Areas from '../../../components/Areas/Areas';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import Pagination from '../../../components/common/Pagination/Pagination';
import { itemsPerPage } from '../../../components/common/Pagination/Pagination';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import { getAreas, getAreasBySearch } from '../../../actions/areas';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const AreasPage = ({match}) => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const mainRouteName = 'areas';

    const dispatch = useDispatch();
    const history = useHistory();

    const stateSource = useSelector((state) => state.areas);
    const [search, setSearch] = useState('');
    const [currentAreaId, setCurrentAreaId] = useState(1);

    // const bull = <span className={classes.bullet}>•</span>;
    // const search = 'hola';
    //search.trim() false/true
    const searchArea = () => {
        if (search.trim()){
            dispatch(getAreasBySearch({search, page, itemsPerPage}));
            history.push(`/areas/search?searchQuery=${search || 'none'}`);
        }else{
            history.push('/');
        }
    }

    const onDispatch = () => {
        dispatch(getAreas(page, itemsPerPage));
    }

    return (
      <Grow in>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchArea} search={search} setSearch={setSearch} history={history}/>
                </Grid>
                <Grid>
                    {!searchQuery && (
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} stateSource={stateSource} onDispatch={onDispatch} mainRouteName={mainRouteName} />
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <Areas currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId}/>
                </Grid>
            </Grid>
      </Grow>
    );
};

export default AreasPage

