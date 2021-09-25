import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUsers, AddUser, GetById, UpdateProfile, SearchUsersByDepartment } from '../../actions/users'
import TableGrid from '../../components/common/TableGrid/TableGrid'
import AddButton from '../../components/common/AddButton/AddButton';
import { editButton } from '../../buttons/buttons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import UserForm from '../../components/Users/UserForm/UserForm';
import { openUserFormDialog } from '../../actions/userFormDialog'

const UsersPage = ({ match }) => {

    const dispatch = useDispatch();
    const departmentId = match ? match.params.departmentId : null;
    let { users, loading, error, amountOfPages } = useSelector(state => state.users.users)
    let user = useSelector(state => state.users.user)
    const [rowsDataGrid, setRows] = React.useState([]);

    useEffect(() => {
        (async () => {
            getAllUsers();
        })()
    }, [departmentId]);

    // The data of the rows is mapped to an object that will be passed to table component
    useEffect(() => {
        if (users) {
            setRows(users.map((user) => ({ id: user.id, name: user.name, lastName: user.lastName, role: user.role.title, code: user.code })));
        }
    }, [users]);


    // Table headers
    const headers = [
        { field: 'id', headerName: 'Id', flex: 0.5, hide: true },
        { field: 'code', headerName: 'Codigo', flex: 2 },
        { field: 'name', headerName: 'Nombre', flex: 2 },
        { field: 'lastName', headerName: 'Apellido', flex: 2 },
        { field: 'role', headerName: 'Rol', flex: 2 },
    ]


    const getAllUsers = () => {
        dispatch(GetUsers({ departmentId: departmentId, page: 1, itemsPerPage: 10 }));
    }

    const onSearch = (filter) => {
        if (filter) {
            dispatch(SearchUsersByDepartment({ departmentId: departmentId, page: 1, itemsPerPage: 10, filter: filter }));
        }
        else {
            getAllUsers();
        }
    }

    // Gets user data when a registry is selected on grid component 
    const onRowSelection = (id) => {
        if (id) {
            dispatch(GetById(id))
        }
    }

    const onGridPageChange = (page, itemsPerPage) => {
        dispatch(GetUsers({ departmentId: departmentId, page: page + 1, itemsPerPage: itemsPerPage }))
    }


    const onEditClick = () => {
        dispatch(openUserFormDialog());
    }

    editButton.onClick = onEditClick;

    return loading ? (
        <Box textAlign='center'>
            <CircularProgress />
        </Box>
    ) : error ? (
        <h2>{error}</h2>
    ) : (
        <>
            <SearchBar onSearch={onSearch} onCancel={getAllUsers} />
            <Box textAlign='right' mr={10}>
                <AddButton title="usuario" onClick={openUserFormDialog}></AddButton>
            </Box>
            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                users && (
                    <TableGrid headers={headers} actions={[editButton]}
                        amountOfPages={amountOfPages} onPageChange={onGridPageChange}
                        data={rowsDataGrid} amountOfRows={24}
                        onRowSelection={onRowSelection} />
                )
            }

            <UserForm departmentId={departmentId} title={`${user ? "Editar" : "Crear"} usuario`} saveUser={user ? UpdateProfile : AddUser} />
        </>

    )
}

export default UsersPage;
