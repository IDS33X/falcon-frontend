import React, { useState, useEffect } from 'react';
import { Grow, Grid, Paper } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import Pagination from '../../../components/common/Pagination/Pagination';
import { itemsPerPage } from '../../../components/common/Pagination/Pagination';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import AddButton from '../../../components/common/AddButton/AddButton';
import EditCardDialog from '../../../components/common/EditCardDialog/EditCardDialog';
import ConfirmationDialog from '../../../components/common/ConfirmationDialog/ConfirmationDialog';
import { createRiskCategory, getAmountOfRiskCategories, getRiskCategoriesByDepartment, getRiskCategoriesBySearch, updateRiskCategory } from '../../../actions/riskCategories';
import { store } from '../../..';
import RiskCategories from '../../../components/RiskCategories/RiskCategories';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const RiskCategoriesPage = () => {
    const classes = useStyles();
    const query = useQuery();
    var user = JSON.parse(localStorage.getItem('profile'));
    const departmentId = query.get('department') || user.employee.departmentId; // get from local storage maybe
    //const stateSource = useSelector((state) => state.riskCategories);
    //console.log();
    var page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const mainRouteName = 'riskcategories';

    const dispatch = useDispatch();
    const history = useHistory();

    const stateSource = useSelector((state) => state.riskCategories);
    const { amountOfPages, amountOfLastPageRiskCategories } = stateSource; // hay que agregar estado al stateSource
    const [search, setSearch] = useState('');
    const [currentRiskCategoryId, setCurrentRiskCategoryId] = useState(1);
    const [formType, setFormType] = useState('Editar');

    // const bull = <span className={classes.bullet}>•</span>;
    // const search = 'hola';
    //search.trim() false/true

    const searchRiskCategory = (search) => {
        if (search?.trim()){
            dispatch(getRiskCategoriesBySearch({departmentId, search, page, itemsPerPage})); // We need to implement searching among the complete state, not just one page.
            history.push(`/riskcategories/search?searchQuery=${search || 'none'}&departmentId=${departmentId}&page=${page}`);
        }else{
            dispatch(getRiskCategoriesByDepartment({departmentId, page, itemsPerPage}));
            //history.push('/');
        }
    }
    
    const onDispatch = () => {
        if(searchQuery){
            searchRiskCategory(search);
        }else{
            console.log(`There is a department Id of ${departmentId}`);
            dispatch(getRiskCategoriesByDepartment({departmentId, page, itemsPerPage}));
        }
    }

    useEffect(()=> {
        if(page){
             verifyAmountOfRiskCategories(); // 8
         }
     }, [amountOfLastPageRiskCategories, page])

    const verifyAmountOfRiskCategories = () => {
        if(amountOfLastPageRiskCategories === itemsPerPage){
            page = amountOfPages + 1;
        }
        else {
            page = amountOfPages;
        }
    }

    const onCreateDispatch = (riskCategoryTitle, riskCategoryDescription) => {
        dispatch(getAmountOfRiskCategories(amountOfPages));
        //dispatch(getAreas(page, itemsPerPage));
        dispatch(createRiskCategory({ riskCategory: { departmentId: departmentId, title: riskCategoryTitle, description: riskCategoryDescription } })); // Esto basta
        //onDispatch();
        history.push(`/riskcategories?departmentId=${departmentId}&page=${amountOfPages}`);
        //verifyAmountOfAreas(areas);
        //dispatch(getAreas(verifyFullPage(areas), itemsPerPage));
    }
    
    const onUpdateDispatch = (riskCategoryId, riskCategoryTitle, riskCategoryDescription) => {
        dispatch(updateRiskCategory({ riskCategory: { id: riskCategoryId, departmentId: departmentId, title: riskCategoryTitle, description: riskCategoryDescription }}));
    }

    return (
      <Grow in>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <EditCardDialog currentRiskCategoryId={currentRiskCategoryId} setCurrentRiskCategoryId={setCurrentRiskCategoryId} formType={formType} stateSource={stateSource} onCreateDispatch={onCreateDispatch} departmentId={departmentId} entityType={'riskCategory'} onUpdateDispatch={onUpdateDispatch} /*amountOfPages={amountOfPages} */ />
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchRiskCategory} search={search} setSearch={setSearch} history={history}/>
                </Grid>
                    <AddButton setFormType={setFormType}/>
                <Grid item xs={12}>
                    <RiskCategories currentRiskCategoryId={currentRiskCategoryId} setCurrentRiskCategoryId={setCurrentRiskCategoryId} setFormType={setFormType}/>
                    <Grid className={classes.paginationGrid}>
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} stateSource={stateSource} onDispatch={onDispatch} mainRouteName={mainRouteName} departmentId={departmentId}/>
                            </Paper>
                    </Grid>
                </Grid>
            </Grid>
      </Grow>
    );
};

export default RiskCategoriesPage;
