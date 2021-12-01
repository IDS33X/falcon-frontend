import React, { useState, useEffect } from 'react';
import { Grow, Grid, Paper } from '@material-ui/core';
import Areas from '../../../components/Areas/Areas';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import Pagination from '../../../components/common/Pagination/Pagination';
import { itemsPerPage } from '../../../components/common/Pagination/Pagination';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import AddButton from '../../../components/common/AddButton/AddButton';
import EditCardDialog from '../../../components/common/EditCardDialog/EditCardDialog';
import { getAreas, getAreasBySearch, createArea, updateArea, getAmountOfAreas } from '../../../actions/areas';
import ConfirmationDialog from '../../../components/common/ConfirmationDialog/ConfirmationDialog';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const AreasPage = ({ match }) => {
    const classes = useStyles();
    const query = useQuery();
    var page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const mainRouteName = 'areas';

    const dispatch = useDispatch();
    const history = useHistory();

    const stateSource = useSelector((state) => state.areas);
    const { areas, amountOfPages, amountOfLastPageAreas } = stateSource;
    const [search, setSearch] = useState('');
    const [currentAreaId, setCurrentAreaId] = useState(1);
    const [formType, setFormType] = useState('Editar');

    // const bull = <span className={classes.bullet}>•</span>;
    // const search = 'hola';
    //search.trim() false/true

    const searchArea = (search) => {
        if (search?.trim()) {
            dispatch(getAreasBySearch({ search, page, itemsPerPage }));
            history.push(`/areas/search?searchQuery=${search || 'none'}&page=${page}`);
        } else {
            dispatch(getAreas(page, itemsPerPage));
            //history.push('/');
        }
    }

    const onDispatch = () => {
        if (searchQuery) {
            searchArea(search);
        } else {
            dispatch(getAreas(page, itemsPerPage));
        }
    } // EL ON DISPATCH ES EL QUE ACTUALIZA LA PAGINACION


    useEffect(() => {
        if (page) {
            verifyAmountOfAreas(); // 8
        }
    }, [amountOfLastPageAreas, page])

    const verifyAmountOfAreas = () => {
        if (amountOfLastPageAreas === itemsPerPage) {
            page = amountOfPages + 1;
        }
        else {
            page = amountOfPages;
        }
    }

    const onCreateDispatch = (areaTitle, areaDescription) => {
        //history.push(`/areas?page=${amountOfPages}`); // Going to the last page before verifying the amount of Areas
        // because areas.length its equal to the amount of areas of the current page. 
        dispatch(getAmountOfAreas(amountOfPages));
        //dispatch(getAreas(page, itemsPerPage));
        dispatch(createArea({ area: { title: areaTitle, description: areaDescription } })); // Esto basta
        onDispatch();
        history.push(`/areas?page=${amountOfPages}`);
        //verifyAmountOfAreas(areas);
        //dispatch(getAreas(verifyFullPage(areas), itemsPerPage));
    }

    const onUpdateDispatch = (areaId, areaTitle, areaDescription) => {
        //onDispatch();
        dispatch(updateArea({ area: { id: areaId, title: areaTitle, description: areaDescription } }));
    }

    return (
        <Grow in>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <EditCardDialog currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId} formType={formType} stateSource={stateSource} onCreateDispatch={onCreateDispatch} onUpdateDispatch={onUpdateDispatch} amountOfPages={amountOfPages} entityType={'area'} />
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent testId="areaSearchBar" onSearchClick={searchArea} search={search} setSearch={setSearch} history={history} />
                </Grid>
                <AddButton testId="addAreaButton" setFormType={setFormType} />
                <Grid item xs={12} style={{ marginBottom: -12, marginTop: -10, display: 'flex', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    <h2 style={{ float: "left", display: 'inline-block', fontWeight: 700, color: '#023E7D', fontSize: '16px', marginTop: '-5px' }}>Home</h2>
                </Grid>
                <Grid item xs={12}>
                    <Areas currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId} setFormType={setFormType} />
                    <Grid className={classes.paginationGrid}>
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={page} stateSource={stateSource} onDispatch={onDispatch} mainRouteName={mainRouteName} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>
    );
};

export default AreasPage;

