import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router';
import useStyles from './styles';


import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { headers, getGridRows } from '../../../helpers/risksHelper'

// Custom components 

import { editButton, showControlsButton } from '../../../buttons/buttons';
import RiskControls from '../../../components/Risks/RiskControls/RiskControls';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import RiskForm from '../../../components/Risks/RiskForm/RiskForm';
import CircularButton from '../../../components/common/CircularButton/CircularButton';
import TableGrid from '../../../components/common/TableGrid/TableGrid'
import AddButton from '../../../components/common/AddButton/AddButton';

// Actions 
import { SetRisk, GetRisksByCategory, SearchRiskByCode, AddRisk, openFormDialog, UpdateRisk, GetRiskImpacts } from '../../../actions/risks';
import { GetControlsByRisk, GetControls } from '../../../actions/controls';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const RisksPage = ({ match }) => {

    const categoryId = match ? match.params.categoryId : null;
    const selectedRisk = useSelector(state => state.risks.risk);
    const { risks, loading, error, amountOfPages, riskImpacts } = useSelector(state => state.risks);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const riskQuery = query.get('risk');
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [rowsDataGrid, setRows] = useState([]);
    const [currentPage, setPage] = useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [selectedRiskGridId, setSelectedRiskGrid] = React.useState(null);
    const [showRiskControlsDialog, setShowRiskControlsDialog] = useState(false);
    //const [controlsByRisk, setControlsByRisk] = useState([]);

    const mainRouteName = `/riskcategories/${match.params.categoryId}/risks`;
    //let riskId;
    const [riskId, setRiskId] = React.useState(selectedRisk?.id);

    useEffect(() => {

        // If there's a risks param in the url, data of said risk will be dispatched to the store.
        if (riskQuery) {

            dispatch(GetRisksByCategory(categoryId, currentPage + 1, pageSize));
            const riskk = risks.find(risk => risk.id === riskQuery);
            dispatch(SetRisk(riskk))

        }
        else if (searchQuery) {
            setSearch(searchQuery);
            searchRisk(searchQuery);
        }
        else {
            history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
            dispatch(GetRisksByCategory(categoryId, currentPage + 1, pageSize));

        }

    }, [currentPage, pageSize]);

    // The data of the rows is mapped to an object with the same fields of the headers
    useEffect(() => {
        if (risks) {
            setRows(getGridRows(risks));
        }
    }, [risks]);

    useEffect(() => {
        if (riskQuery && selectedRisk) {
            dispatch(openFormDialog());
        }
        //setRiskId(selectedRisk?.id);

    }, [rowsDataGrid, selectedRisk, dispatch]);


    // When edit button is clicked this actions are fired
    editButton.onClick = async (rowId) => {
        history.push(`${mainRouteName}/edit?risk=${rowId}`);
        await dispatch(SetRisk(risks.find(risk => risk.id === rowId)));
        dispatch(GetRiskImpacts());
        dispatch(openFormDialog());
    }


    // When manage controls is clicked this actions are fired
    showControlsButton.onClick = async (rowId) => {
        setRiskId(rowId);
        history.push(`${mainRouteName}/?risk=${rowId}&/controls/`);
        await dispatch(GetControlsByRisk(rowId, 1, 20));
        await dispatch(GetControls(1, 50));
        setShowRiskControlsDialog(true);

    }

    const searchRisk = (search) => {
        // Filter users by search only if there's something written on search bar
        if (search?.trim()) {
            dispatch(SearchRiskByCode(categoryId, 1, pageSize, search));
            history.push(`${mainRouteName}/search?&searchQuery=${search || 'none'}`);
        }
        else {
            dispatch(GetRisksByCategory(categoryId, currentPage + 1, pageSize));
            resetRoute();

        }
    }

    const openControlsPage = () => {
        history.push(`/riskCategories/${match.params.categoryId}/controls`);
    }


    // Reset the route from a child component (ex: used when closing a form dialog)
    const resetRoute = () => {
        history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
    }

    return loading ? (
        <Box textAlign='center' justifyContent='center'>
            <CircularProgress />
        </Box>
    ) : error ? (
        <h2>{error}</h2>
    ) : (
        <>
            <Grid container alignItems="stretch" className={classes.gridContainer}>
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <h1>
                        Gestionar riesgos
                    </h1>
                </Grid>

            </Grid>

            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchRisk} search={search} setSearch={setSearch} history={history} />
                </Grid>
                <Grid>
                    <CircularButton variant="contained" onClick={openControlsPage} color="primary">Gestionar controles</CircularButton>
                    <AddButton title="riesgo" onClick={openFormDialog}></AddButton>

                </Grid>


            </Grid>


            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                rowsDataGrid && (
                    <>
                        <TableGrid headers={headers} actions={[editButton, showControlsButton]}
                            amountOfPages={amountOfPages} editRoute={`${mainRouteName}/edit?risk=`} rowDoubleClick={openControlsPage}
                            data={rowsDataGrid} amountOfRows={10} page={currentPage} setPage={setPage} onSelectionChange={setSelectedRiskGrid}
                            pageSize={pageSize} setPageSize={setPageSize} />


                    </>

                )


            }

            {
                selectedRisk
                    ? <RiskForm categoryId={categoryId} risk={selectedRisk} title={"Editar riesgo"} saveRisk={UpdateRisk} resetRoute={resetRoute} riskImpacts={riskImpacts} />

                    : <RiskForm resetRoute={resetRoute} categoryId={categoryId} risk={selectedRisk} title={"Agregar riesgo"} saveRisk={AddRisk} riskImpacts={riskImpacts} />

            }
            {


                showRiskControlsDialog &&
                <RiskControls
                    mainRouteName={mainRouteName}
                    riskId={riskQuery}
                    showDialog={showRiskControlsDialog}
                    setShowDialog={setShowRiskControlsDialog} />


            }



        </>

    )
}

export default RisksPage;
