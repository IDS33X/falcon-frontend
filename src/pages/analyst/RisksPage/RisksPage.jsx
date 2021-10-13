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
import { ResetRisk, SetRisk, GetRisksByCategory, SearchRiskByCode, AddRisk, UpdateRisk } from '../../../actions/risks'
import { headers, getGridRows } from '../../../helpers/risksHelper'
import { openFormDialog } from '../../../actions/risks'

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const RisksPage = ({ match }) => {

    const categoryId = match ? match.params.categoryId : null;
    const selectedRisk = useSelector(state => state.risks.risk);
    const { risks, loading, error, amountOfPages } = useSelector(state => state.risks);
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
    const mainRouteName = `/areas/${match.params.areaId}/divisions/${match.params.divisionId}/departments/${match.params.departmentId}/categories/${match.params.categoryId}/risks`;




    useEffect(() => {

        // If there's a risks param in the url, data of said risk will be dispatched to the store.
        if (riskQuery) {
            dispatch(SetRisk(risks.find(risk => risk.id == riskQuery)))
            dispatch(openFormDialog());
            dispatch(GetRisksByCategory(categoryId, currentPage + 1, pageSize));

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



    editButton.onClick = async (rowId) => {
        history.push(`${mainRouteName}/edit?risk=${rowId}`);
        await dispatch(SetRisk(risks.find(risk => risk.id === riskQuery)))
        //dispatch(openFormDialog());
    }


    const searchRisk = (search) => {
        if (search?.trim()) {
            dispatch(SearchRiskByCode(categoryId, 1, pageSize, search));

            history.push(`${mainRouteName}/search?&searchQuery=${search || 'none'}`);
        }
        else {
            dispatch(GetRisksByCategory(categoryId, currentPage + 1, pageSize));
            resetRoute();

        }
    }

    // Reset the route from a child component (ex: used when closing a form dialog)
    const resetRoute = () => {
        history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
    }

    return loading ? (
        <Box textAlign='center'>
            <CircularProgress />
        </Box>
    ) : error ? (
        <h2>{error}</h2>
    ) : (
        <>


            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchRisk} search={search} setSearch={setSearch} history={history} />
                </Grid>
                <Grid>
                    <AddButton title="riesgo" onClick={openFormDialog}></AddButton>
                </Grid>


            </Grid>




            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                rowsDataGrid && (
                    <TableGrid headers={headers} actions={[editButton]}
                        amountOfPages={amountOfPages} editRoute={`${mainRouteName}/edit?risk=`}
                        data={rowsDataGrid} amountOfRows={10} page={currentPage} setPage={setPage}
                        pageSize={pageSize} setPageSize={setPageSize} />

                )
            }

            {
                selectedRisk
                    ? <RiskForm categoryId={categoryId} risk={selectedRisk} title={"Editar riesgo"} saveRisk={UpdateRisk} resetRoute={resetRoute} />

                    : <RiskForm resetRoute={resetRoute} categoryId={categoryId} risk={selectedRisk} title={"Agregar riesgo"} saveRisk={AddRisk} />

            }


        </>

    )
}

export default RisksPage;
