import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetUsers, AddUser, GetById, UpdateProfile } from '../../actions/users'
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

    useEffect(() => {

        (async () => {
            await dispatch(GetUsers({ departmentId: departmentId, page: 1, itemsPerPage: 100 })); // page and itemsPerPage will be obtained from grid component
        })()
    }, [departmentId, GetUsers]);


    // Headers of the grid
    const headers = [
        { field: 'id', headerName: 'Id', flex: 0.5, hide: true },
        { field: 'code', headerName: 'Codigo', flex: 2 },
        { field: 'name', headerName: 'Nombre', flex: 2 },
        { field: 'lastName', headerName: 'Apellido', flex: 2 },
        { field: 'role', headerName: 'Rol', flex: 2 },

    ]

    // The data of the rows is mapped to an object that will be passed to the grid component
    let rows;
    if (users) {
        rows = users.map((user) => ({ id: user.id, name: user.name, lastName: user.lastName, role: user.role.title, code: user.code }))
    }
    const onSearchClick = (e) => {
        dispatch(GetUsers({ divisionId: departmentId, page: 1, itemsPerPage: 10 }));
    }

    // Gets user data when a registry is selected on grid component 
    const onRowSelection = (id) => {
        if (id) {
            dispatch(GetById(id))
        }
    }
    const onEditClick = () => {

        dispatch(openUserFormDialog());
    }


    editButton.onClick = onEditClick;
    const gridActions = [editButton]

    return loading ? (
        <Box textAlign='center'>
            <CircularProgress />
        </Box>
    ) : error ? (
        <h2>{error}</h2>
    ) : (
        <>
            <SearchBar onSearchClick={onSearchClick} />
            <Box textAlign='right' mr={10}>
                <AddButton title="usuario" onClick={openUserFormDialog}></AddButton>
            </Box>
            {
                // Renders grid component only when data is fetched from database, this is in order to avoid 'undefined rows' error.
                users && (
                    <TableGrid headers={headers} rows={rows} actions={gridActions}
                        amountOfPages={amountOfPages}
                        onPageChange={GetUsers({ departmentId: departmentId })}
                        onRowSelection={onRowSelection} />
                )
            }

            <UserForm departmentId={departmentId} title={`${user ? "Editar" : "Crear"} usuario`} saveUser={user ? AddUser : UpdateProfile} />


        </>

    )
}

export default UsersPage;
