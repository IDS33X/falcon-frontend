import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUsers, AddUser, GetById, UpdateProfile, SearchUsersByDepartment } from '../../../actions/users'
import TableGrid from '../../../components/common/TableGrid/TableGrid'
import AddButton from '../../../components/common/AddButton/AddButton';
import { editButton } from '../../../buttons/buttons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import SearchBarComponent from '../../../components/common/SearchBar/SearchBar';
import UserForm from '../../../components/Users/UserForm/UserForm';
import { openUserFormDialog } from '../../../actions/userFormDialog'
import { useHistory, useLocation } from 'react-router';
import { Grid, Paper } from '@material-ui/core';
import useStyles from './styles';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const UsersPage = ({ match }) => {

    const departmentId = match ? match.params.departmentId : null;
    const selectedUser = useSelector(state => state.users.user);
    const { users, loading, error, amountOfPages, totalOfItems } = useSelector(state => state.users);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const userQuery = query.get('user');
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [rowsDataGrid, setRows] = useState([]);
    const [currentPage, setPage] = useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const mainRouteName = `/areas/${match.params.areaId}/divisions/${match.params.divisionId}/departments/${match.params.departmentId}/users`;

    // Table headers
    const headers = [
        { field: 'id', headerName: 'Id', flex: 0.5, hide: true },
        { field: 'code', headerName: 'Codigo', flex: 2 },
        { field: 'name', headerName: 'Nombre', flex: 2 },
        { field: 'lastName', headerName: 'Apellido', flex: 2 },
        { field: 'role', headerName: 'Rol', flex: 2 },
    ]


    useEffect(() => {

        // If there's a user param in the url, data of said user will be fetched.
        if (userQuery) {
            dispatch(GetById(userQuery))
            dispatch(openUserFormDialog());
            dispatch(GetUsers(departmentId, currentPage + 1, pageSize));

        }
        else if (searchQuery) {
            setSearch(searchQuery);
            searchUser(searchQuery);
        }
        else {
            history.push(`${mainRouteName}?page=${currentPage + 1}& rowsPerPage=${pageSize}`);
            dispatch(GetUsers(departmentId, currentPage + 1, pageSize));

        }

    }, [currentPage, pageSize]);

    // The data of the rows is mapped to an object with the same fields of the headers
    useEffect(() => {
        if (users) {
            setRows(users?.map((user) => ({ id: user?.id, name: user?.name, lastName: user?.lastName, role: user.role?.title, code: user?.code })));
        }
    }, [users]);



    editButton.onClick = async (rowId) => {
        history.push(`${mainRouteName}/edit?user=${rowId}`);
        await dispatch(GetById(rowId))
        dispatch(openUserFormDialog());
    }


    const searchUser = (search) => {
        if (search?.trim()) {
            dispatch(SearchUsersByDepartment(departmentId, 1, search, pageSize));

            history.push(`${mainRouteName}/search?&searchQuery=${search || 'none'}`);
        }
        else {
            dispatch(GetUsers(departmentId, currentPage + 1, pageSize));
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
            {/* <SearchBar onSearch={onSearch} onCancel={getAllUsers} /> */}

            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                {/* className={classes.gridContainer} */}
                <Grid item xs={12} sm={6} md={9}>
                    <SearchBarComponent onSearchClick={searchUser} search={search} setSearch={setSearch} history={history} />
                </Grid>
                <Grid>
                    <AddButton title="usuario" onClick={openUserFormDialog}></AddButton>
                </Grid>


            </Grid>




            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                rowsDataGrid && (
                    <TableGrid headers={headers} actions={[editButton]}
                        amountOfPages={amountOfPages} editRoute={`${mainRouteName}/edit?user=`}
                                data={rowsDataGrid} amountOfRows={totalOfItems} page={currentPage} setPage={setPage}
                        pageSize={pageSize} setPageSize={setPageSize} />

                )
            }

            {
                selectedUser
                    ? <UserForm departmentId={departmentId} user={selectedUser} title={"Editar usuario"} saveUser={UpdateProfile} resetRoute={resetRoute} />

                    : <UserForm resetRoute={resetRoute} departmentId={departmentId} title={"Agregar usuario"} saveUser={AddUser} />

            }


        </>

    )
}

export default UsersPage;
