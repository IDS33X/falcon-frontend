import useStyles from './styles';
import { DataGrid } from '@material-ui/data-grid';
import TableChartIcon from '@material-ui/icons/TableChart';
import RowMenuCell from './RowMenuCell';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';


// Generic componet that renders a grid with dynamic  headers and data


const TableGrid = ({ headers, rows, actions, amountOfPages, onRowSelection }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetchedRows, setRows] = React.useState(rows);


    // Component used to pass all the parameters received from the parent to MenuCell component before using it with renderCell (it cannot be done directly)
    const RenderOptions = () => {
        return (
            <RowMenuCell actions={actions} />
        )
    }


    const columns = [
        {
            field: 'actions',
            headerName: 'Acciones',
            renderCell: RenderOptions, // Add the action buttons to this column (so the grid wont try to look up for a property called "actions" in the rows)
            sortable: false,
            width: 120,
            headerAlign: 'center',
            filterable: false,
            align: 'center',
            disableColumnMenu: true,
            disableReorder: true,
        },
        ...headers // Add all the other headers to the grid
    ];



    const handleChangePage = (page) => {
        setLoading(true);
        setCurrentPage(page);

        //dispatch(onPageChange({ page: currentPage + 1, itemsPerPage: 10 }));
        //setRows(newRows);
        setLoading(false);
    };


    return (
        <div className={classes.tableGrid}>
            <DataGrid
                page={currentPage}
                rows={fetchedRows}
                //rowCount={amountOfPages}
                columns={columns}
                pageSize={10}
                pagination
                //paginationMode="server"
                onPageChange={(newpage) => handleChangePage(newpage)}
                loading={loading}
                onSelectionModelChange={(rowId) => onRowSelection(rowId[0])}
            />
        </div>
    );
}
export default TableGrid;