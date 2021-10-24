import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableGrid from '../../../components/common/TableGrid/TableGrid'
import AddButton from '../../../components/common/AddButton/AddButton';
import { editButton } from '../../../buttons/buttons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import ControlForm from '../../../components/Controls/ControlForm/ControlForm';
import { useHistory, useLocation } from 'react-router';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import { SetControl, GetControls, SearchControlsByCode, AddControl, UpdateControl, GetAutomationLevels, GetControlStates, GetControlTypes, openFormDialog } from '../../../actions/controls'
import { headers, getGridRows } from '../../../helpers/controlsHelper'
import ConfirmationDialog from '../../../components/common/ConfirmationDialog/ConfirmationDialog';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ControlsPage = ({ match }) => {

    const riskId = match ? match.params.riskId : null;
    const selectedControl = useSelector(state => state.controls.control);
    const { controls, loading, error, totalOfItems, amountOfPages } = useSelector(state => state.controls);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const controlQuery = query.get('control');
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [rowsDataGrid, setRows] = useState([]);
    const [currentPage, setPage] = useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const mainRouteName = `/areas/${match.params.areaId}/divisions/${match.params.divisionId}/departments/${match.params.departmentId}/categories/${match.params.categoryId}/controls`;


    useEffect(() => {

        if (searchQuery) {
            setSearch(searchQuery);
            searchRisk(searchQuery);
        }
        else {
            history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
            dispatch(GetControls(currentPage + 1, pageSize));
            dispatch(GetAutomationLevels());
            dispatch(GetControlTypes());
            dispatch(GetControlStates());

        }

    }, [currentPage, pageSize]);

    // The data of the rows is mapped to an object with the same fields of the headers
    useEffect(() => {
        if (controls) {
            setRows(getGridRows(controls));
        }
    }, [controls]);

    useEffect(() => {
        if (controlQuery && selectedControl) {
            dispatch(openFormDialog());
        }

    }, [rowsDataGrid, selectedControl, dispatch]);


    // When edit button is clicked this actions are fired
    editButton.onClick = async (rowId) => {

        history.push(`${mainRouteName}/edit?control=${rowId}`);
        await dispatch(SetControl(controls.find(control => control.id === rowId)));
        dispatch(openFormDialog());
    }




    const searchRisk = (search) => {
        // Filter users by search only if there's something written on search bar
        if (search?.trim()) {
            dispatch(SearchControlsByCode(riskId, 1, pageSize, search));
            history.push(`${mainRouteName}/search?&searchQuery=${search || 'none'}`);
        }
        else {
            dispatch(GetControls(currentPage + 1, pageSize));
            resetRoute();

        }
    }

    // Reset the route from a child component (ex: used when closing a form dialog)
    const resetRoute = () => {
        history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
    }

    const confirmElimination = () => {
        //history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);

        dispatch(UpdateControl());

        //selectedControl.State = false;
        //dispatch(UpdateControl(JSON.stringify(getFormState(control, riskId))));

    }




    return loading ? (
        <Box textAlign='center' justifyContent='center'>
            <CircularProgress />
        </Box>
    ) : error ? (
        <h2>{error}</h2>
    ) : (
        <>
            <Grid container alignItems="stretch" >
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <h1>
                        Gestion de controles
                    </h1>
                </Grid>

            </Grid>

            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchRisk} search={search} setSearch={setSearch} history={history} />
                </Grid>
                <Grid>
                    <AddButton title="control" onClick={openFormDialog}></AddButton>
                </Grid>


            </Grid>




            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                rowsDataGrid && (
                    <TableGrid headers={headers} actions={[editButton]}
                        amountOfPages={amountOfPages} editRoute={`${mainRouteName}/edit?risk=`}
                        data={rowsDataGrid} amountOfRows={totalOfItems} page={currentPage} setPage={setPage}
                        pageSize={pageSize} setPageSize={setPageSize} />

                )
            }

            {
                selectedControl
                    ? <ControlForm riskId={riskId} control={selectedControl} title={"Editar control"} saveControl={UpdateControl} resetRoute={resetRoute} />

                    : <ControlForm resetRoute={resetRoute} riskId={riskId} control={selectedControl} title={"Agregar control"} saveControl={AddControl} />

            }


            <ConfirmationDialog confirmAction={confirmElimination} />

        </>

    )
}

export default ControlsPage;
