import useStyles from './styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import RowMenuCell from './RowMenuCell';
import React, { useState } from 'react';


// Generic componet that renders a grid with dynamic  headers and data


const TableGrid = ({ headers, actions, data, amountOfRows, onRowSelection, page, setPage, pageSize, setPageSize }) => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = React.useState([]);

    // Component used to pass all the parameters received from the parent to MenuCell component before using it with renderCell (it cannot be done directly)
    const RenderOptions = (idRow) => {
        return (
            <RowMenuCell idRow={idRow} actions={actions} />
        )
    }


    React.useEffect(() => {
        setRows(data);

    }, [data]);

    const columns = [
        {
            field: 'actions',
            headerName: 'Acciones',
            renderCell: ({ id }) => (RenderOptions(id)), // Add the action buttons to this column (so the grid wont try to look up for a property called "actions" in the rows)
            sortable: false,
            width: 120,
            headerAlign: 'center',
            filterable: false,
            align: 'center',
            disableColumnMenu: true,
            disableReorder: true,
            disableClickEventBubbling: true,


        },
        ...headers // Add all the other headers to the grid
    ];

    const handleChangePage = (newPage) => {
        setLoading(true);
        setPage(newPage);

    };

    const handleChangePageSize = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(0);
    };


    return (
        <div className={classes.tableGrid}>
            <DataGrid
                rows={rows}
                rowCount={amountOfRows} // Total of registries in database
                columns={columns}
                page={page}
                pageSize={pageSize}
                pagination
                components={{ Toolbar: GridToolbar }}
                paginationMode="server"
                onPageChange={(newpage) => handleChangePage(newpage)}
                loading={loading}
                rowsPerPageOptions={[5, 10, 15]}
                onPageSizeChange={(size) => handleChangePageSize(size)}
                onSelectionModelChange={(rowId) => onRowSelection(rowId[0])} // When a row is selected the data of that registry will be updated in store
            />
        </div>
    );
}
export default TableGrid;