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

    const riskCategoryId = match ? match.params.categoryId : null;
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
    const mainRouteName = `/riskcategories/${match.params.categoryId}/controls`;
    const { riskCategoryTitle } = useSelector(state => state.riskCategories);


    useEffect(() => {

        if (searchQuery) {
            setSearch(searchQuery);
            searchRisk(searchQuery);
        }
        else {
            history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
            dispatch(GetControls(riskCategoryId, currentPage + 1, pageSize));
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
            dispatch(SearchControlsByCode(riskCategoryId, 1, pageSize, search));
            history.push(`${mainRouteName}/search?&searchQuery=${search || 'none'}`);
        }
        else {
            dispatch(GetControls(riskCategoryId, currentPage + 1, pageSize));
            resetRoute();

        }
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
            <Grid container alignItems="stretch" >
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <h1>
                        Controles
                    </h1>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginBottom: -12, marginTop: -10, display: 'flex', alignContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
                    <h2 style={{float: "left", display: 'inline-block', fontWeight: 400, color: '#023E7D', fontSize: '16px',marginTop: '-5px'}}>
                    <span style={{color: '#000e29', fontStyle: 'normal', fontWeight: 700}}>Home &gt; </span>{riskCategoryTitle}</h2>
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
                    ? <ControlForm categoryId={match.params.riskCategoryId} riskCategoryId={riskCategoryId} control={selectedControl} title={"Editar control"} saveControl={UpdateControl} resetRoute={resetRoute} />

                    : <ControlForm categoryId={match.params.riskCategoryId} resetRoute={resetRoute} riskCategoryId={riskCategoryId} control={selectedControl} title={"Agregar control"} saveControl={AddControl} />

            }



        </>

    )
}

export default ControlsPage;
