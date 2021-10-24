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
import {  } from '../../../actions/divisions';
import Departments from '../../../components/Departments/Departments';
import { createDepartment, getAmountOfDepartments, getDepartmentsByDivision, getDepartmentsBySearch, updateDepartment } from '../../../actions/departments';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const DepartmentsPage = () => {
    const classes = useStyles();
    const query = useQuery();
    const divisionId = query.get('divisionId');
    var page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const mainRouteName = 'departments';

    const dispatch = useDispatch();
    const history = useHistory();

    const stateSource = useSelector((state) => state.departments);
    const { amountOfPages, amountOfLastPageDepartments } = stateSource; // hay que agregar estado al stateSource
    const [search, setSearch] = useState('');
    const [currentDepartmentId, setCurrentDepartmentId] = useState(1);
    const [formType, setFormType] = useState('Editar');

    // const bull = <span className={classes.bullet}>•</span>;
    // const search = 'hola';
    //search.trim() false/true

    const searchDepartment = () => {
        if (search.trim()){
            dispatch(getDepartmentsBySearch({divisionId, search, page, itemsPerPage}));
            history.push(`/departments/search?searchQuery=${search || 'none'}&divisionId=${divisionId}&page=${page}`);
        }else{
            history.push('/');
        }
    }
    
    const onDispatch = () => {
        if(searchQuery){
            searchDepartment();
        }else{
            console.log(amountOfPages);
            dispatch(getDepartmentsByDivision({divisionId, page, itemsPerPage}));
        }
    }

    useEffect(()=> {
        if(page){
             verifyAmountOfDepartments(); // 8
         }
     }, [amountOfLastPageDepartments, page])

    const verifyAmountOfDepartments = () => {
        if(amountOfLastPageDepartments === itemsPerPage){
            page = amountOfPages + 1;
        }
        else {
            page = amountOfPages;
        }
    }

    const onCreateDispatch = (departmentTitle, departmentDescription) => {
        dispatch(getAmountOfDepartments(amountOfPages));
        //dispatch(getAreas(page, itemsPerPage));
        dispatch(createDepartment({department: { divisionId: divisionId, title: departmentTitle, description: departmentDescription } })); // Esto basta
        //onDispatch();
        history.push(`/departments?divisionId=${divisionId}&page=${amountOfPages}`);
        //verifyAmountOfAreas(areas);
        //dispatch(getAreas(verifyFullPage(areas), itemsPerPage));
    }
    
    const onUpdateDispatch = (departmentId, departmentTitle, departmentDescription) => {
        dispatch(updateDepartment({department: {id: departmentId, divisionId: divisionId, title: departmentTitle, description: departmentDescription}}));
    }

    return (
      <Grow in>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <EditCardDialog currentDepartmentId={currentDepartmentId} setCurrentDepartmentId={setCurrentDepartmentId} formType={formType} stateSource={stateSource} onCreateDispatch={onCreateDispatch} divisionId={divisionId} entityType={'department'} onUpdateDispatch={onUpdateDispatch} /*amountOfPages={amountOfPages} */ />
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchDepartment} search={search} setSearch={setSearch} history={history}/>
                </Grid>
                    <AddButton setFormType={setFormType}/>
                <Grid item xs={12}>
                    <Departments currentDepartmentId={currentDepartmentId} setCurrentDepartmentId={setCurrentDepartmentId} setFormType={setFormType}/>
                    <Grid className={classes.paginationGrid}>
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} stateSource={stateSource} onDispatch={onDispatch} mainRouteName={mainRouteName} divisionId={divisionId}/>
                            </Paper>
                    </Grid>
                </Grid>
            </Grid>
      </Grow>
    );
};

export default DepartmentsPage;