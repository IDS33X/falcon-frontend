import React, { useState, useEffect } from 'react';
import { Grow, Grid, Paper } from '@material-ui/core';
import Divisions from '../../../components/Divisions/Divisions';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import Pagination from '../../../components/common/Pagination/Pagination';
import { itemsPerPage } from '../../../components/common/Pagination/Pagination';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import AddButton from '../../../components/common/AddButton/AddButton';
import EditCardDialog from '../../../components/common/EditCardDialog/EditCardDialog';
import ConfirmationDialog from '../../../components/common/ConfirmationDialog/ConfirmationDialog';
import { createDivision, getAmountOfDivisions, getDivisionsByArea, getDivisionsBySearch, updateDivision } from '../../../actions/divisions';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const DivisionsPage = () => {
    const classes = useStyles();
    const query = useQuery();
    const areaId = query.get('areaId');
    var page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const mainRouteName = 'divisions';

    const dispatch = useDispatch();
    const history = useHistory();

    const stateSource = useSelector((state) => state.divisions);
    const { amountOfPages, amountOfLastPageDivisions } = stateSource; // hay que agregar estado al stateSource
    const [search, setSearch] = useState('');
    const [currentDivisionId, setCurrentDivisionId] = useState(1);
    const [formType, setFormType] = useState('Editar');

    // const bull = <span className={classes.bullet}>•</span>;
    // const search = 'hola';
    //search.trim() false/true

    const searchDivision = () => {
        if (search.trim()){
            dispatch(getDivisionsBySearch({areaId, search, page, itemsPerPage}));
            history.push(`/divisions/search?searchQuery=${search || 'none'}&areaId=${areaId}&page=${page}`);
        }else{
            history.push('/');
        }
    }
    
    const onDispatch = () => {
        if(searchQuery){
            searchDivision();
        }else{
            dispatch(getDivisionsByArea({areaId, page, itemsPerPage}));
        }
    }

    useEffect(()=> {
        if(page){
             verifyAmountOfDivisions(); // 8
         }
     }, [amountOfLastPageDivisions, page])

    const verifyAmountOfDivisions = () => {
        if(amountOfLastPageDivisions === itemsPerPage){
            page = amountOfPages + 1;
        }
        else {
            page = amountOfPages;
        }
    }

    const onCreateDispatch = (divisionTitle, divisionDescription) => {
        dispatch(getAmountOfDivisions(amountOfPages));
        //dispatch(getAreas(page, itemsPerPage));
        dispatch(createDivision({division: { areaId: areaId, title: divisionTitle, description: divisionDescription } })); // Esto basta
        //onDispatch();
        history.push(`/divisions?areaId=${areaId}&page=${amountOfPages}`);
        //verifyAmountOfAreas(areas);
        //dispatch(getAreas(verifyFullPage(areas), itemsPerPage));
    }
    
    const onUpdateDispatch = (divisionId, divisionTitle, divisionDescription) => {
        dispatch(updateDivision({division: {id: divisionId, areaId: areaId, title: divisionTitle, description: divisionDescription}}));
    }

    return (
      <Grow in>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <EditCardDialog currentDivisionId={currentDivisionId} setCurrentDivisionId={setCurrentDivisionId} formType={formType} stateSource={stateSource} onCreateDispatch={onCreateDispatch} areaId={areaId} entityType={'division'} onUpdateDispatch={onUpdateDispatch} /*amountOfPages={amountOfPages} */ />
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchDivision} search={search} setSearch={setSearch} history={history}/>
                </Grid>
                    <AddButton setFormType={setFormType}/>
                <Grid item xs={12}>
                    <Divisions currentDivisionId={currentDivisionId} setCurrentDivisionId={setCurrentDivisionId} setFormType={setFormType}/>
                    <Grid className={classes.paginationGrid}>
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} stateSource={stateSource} onDispatch={onDispatch} mainRouteName={mainRouteName} areaId={areaId}/>
                            </Paper>
                    </Grid>
                </Grid>
            </Grid>
      </Grow>
    );
};

export default DivisionsPage;