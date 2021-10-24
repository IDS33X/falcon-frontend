import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableGrid from '../../../components/common/TableGrid/TableGrid'
import AddButton from '../../../components/common/AddButton/AddButton';
import { editButton } from '../../../buttons/buttons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import RiskForm from '../../../components/Risks/RiskForm/RiskForm';
import { useHistory, useLocation } from 'react-router';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { SetRisk, GetRisksByCategory, SearchRiskByCode, AddRisk, UpdateRisk, GetRiskImpacts } from '../../../actions/risks'
import { headers, getGridRows } from '../../../helpers/risksHelper'
import { openFormDialog } from '../../../actions/risks'
import CircularButton from '../../../components/common/CircularButton/CircularButton';
import ExportRisks from '../../../components/Risks/ExportRisks/ExportRisks'
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

    const mainRouteName = `/areas/${match.params.areaId}/divisions/${match.params.divisionId}/departments/${match.params.departmentId}/categories/${match.params.categoryId}/risks`;


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

    }, [rowsDataGrid, selectedRisk, dispatch]);


    // When edit button is clicked this actions are fired
    editButton.onClick = async (rowId) => {
        history.push(`${mainRouteName}/edit?risk=${rowId}`);
        await dispatch(SetRisk(risks.find(risk => risk.id === rowId)));
        dispatch(GetRiskImpacts());

        dispatch(openFormDialog());
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
        history.push(`/areas/${match.params.areaId}/divisions/${match.params.divisionId}/departments/${match.params.departmentId}/categories/${match.params.categoryId}/controls`);
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

                    {
                        //         rowsDataGrid && (
                        //     <ExportRisks columns={headers} data={rowsDataGrid} documentName=""></ExportRisks>
                        // )
                    }
                </Grid>


            </Grid>


            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                rowsDataGrid && (
                    <>
                        <TableGrid headers={headers} actions={[editButton]}
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




        </>

    )
}

export default RisksPage;
