import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { GetUsers } from '../../actions/users'
import TableGrid from '../../components/common/TableGrid/TableGrid'
import AddButton from '../../components/common/AddButton/AddButton';
import { deleteButton, editButton } from '../../buttons/buttons'

const UsersPage = ({ userData, GetUsers, rows = [] }) => {

    useEffect(() => {
        GetUsers();
    }, [])

    // The data of the rows in the grid a 
    if (userData.users.employees) {
        rows = userData.users.employees.map((employee) => ({ id: employee.employeeId, name: employee.name, lastName: employee.lastName, role: employee.employeeRol.name, department: employee.departmentId }))
    }

    // If the data is stil being fetched the screen shows a loading message, otherwise the component is shown

    // TODO: This need a decent loading screen 
    return userData.loading ? (
        <h2>Loading</h2>
    ) : userData.error ? (
        <h2>{userData.error}</h2>
    ) : (
        <>
            <AddButton title="usuario"></AddButton>
            {
                // The child component is rendered only when data is fetched from database, this is to avoid 'undefined rows' error.
                userData.users.employees && (
                    <TableGrid headers={headers} rows={rows} actions={gridActions} ></TableGrid>
                )
            }

        </>

    )
}

const headers = [
    { field: 'id', headerName: 'Id', width: 140 },
    {
        field: 'name',
        headerName: 'Nombre',
        width: 200,

    },
    {
        field: 'lastName',
        headerName: 'Apellido',
        width: 200,
    },

    {
        field: 'role',
        headerName: 'Rol',
        width: 200,
    },

    {
        field: 'department',
        headerName: 'Departamento',
        width: 200,

    }
]

editButton.onClick = 'hi'; // TODO define action that will e dispatch 
deleteButton.onClick = 'delete';

const gridActions = [editButton, deleteButton]

const mapStateToProps = state => {
    return {
        userData: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        GetUsers: () => dispatch(GetUsers({ departmentId: 1, page: 1, itemsPerPage: 2 }))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersPage)
